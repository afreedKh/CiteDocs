import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Navigate, Link } from "react-router-dom";
import { SplitAuthScreen } from "../../components/layout/SplitAuthScreen";
import { FeatureCard } from "../../components/layout/FeatureCard";
import { Logo } from "../../components/common/Logo";
import { FormField } from "../../components/forms/FormField";
import { FormError } from "../../components/forms/FormError";
import { otpSchema, type OtpFormData } from "../../lib/validation/authSchemas";
import { useVerifyOtp } from "../../lib/hooks/useAuth";
import { useAuthStore } from "../../lib/store/authStore";

export function VerifyOtpPage() {
  const pendingAuth = useAuthStore((state) => state.pendingAuth);
  const { mutate: verifyOtp, isPending, isError, error } = useVerifyOtp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  // No signup/login in progress — nothing to verify.
  if (!pendingAuth) {
    return <Navigate to="/login" replace />;
  }

  const onSubmit = (data: OtpFormData) => {
    verifyOtp(data.otp);
  };

  return (
    <SplitAuthScreen
      panel={
        <div className="w-full">
          <FeatureCard
            icon={<ShieldCheck size={18} />}
            title="One step from done"
            description="A 6-digit code keeps your account secure"
            delay={0.1}
          />
        </div>
      }
    >
      <Logo />

      <h1 className="text-2xl font-bold text-slate-900 mt-6">
        Verify your email
      </h1>
      <p className="text-slate-500 text-sm mt-1">
        We sent a 6-digit code to{" "}
        <span className="font-medium">{pendingAuth.email}</span>
      </p>

      <div className="mt-6">
        {isError && (
          <FormError
            message={
              (error as any)?.response?.data?.message ||
              "Invalid or expired code"
            }
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField
            label="6-digit code"
            placeholder="123456"
            inputMode="numeric"
            maxLength={6}
            error={errors.otp?.message}
            {...register("otp")}
          />

          <motion.button
            type="submit"
            disabled={isPending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white
                      font-semibold rounded-lg py-2.5 hover:opacity-90 transition-opacity
                      disabled:opacity-50"
          >
            {isPending ? "Verifying..." : "Verify code"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-5">
          Wrong email?{" "}
          <Link
            to={pendingAuth.purpose === "signup" ? "/signup" : "/login"}
            className="text-indigo-600 font-medium"
          >
            Go back
          </Link>
        </p>
      </div>
    </SplitAuthScreen>
  );
}
