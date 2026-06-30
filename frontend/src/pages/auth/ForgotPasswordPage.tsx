import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import { SplitAuthScreen } from "../../components/layout/SplitAuthScreen";
import { FeatureCard } from "../../components/layout/FeatureCard";
import { Logo } from "../../components/common/Logo";
import { FormField } from "../../components/forms/FormField";
import { FormError } from "../../components/forms/FormError";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../../lib/validation/authSchemas";
import { useForgotPassword } from "../../lib/hooks/useAuth";

export function ForgotPasswordPage() {
  const {
    mutate: forgotPassword,
    isPending,
    isError,
    error,
  } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword({ email: data.email });
  };

  return (
    <SplitAuthScreen
      panel={
        <div className="w-full">
          <FeatureCard
            icon={<KeyRound size={18} />}
            title="Forgot your password?"
            description="We'll send a code to verify it's really you"
            delay={0.1}
          />
        </div>
      }
    >
      <Logo />

      <h1 className="text-2xl font-bold text-slate-900 mt-6">
        Reset your password
      </h1>
      <p className="text-slate-500 text-sm mt-1">
        Enter your email and we'll send you a verification code
      </p>

      <div className="mt-6">
        {isError && (
          <FormError
            message={
              (error as any)?.response?.data?.message || "Something went wrong"
            }
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField
            label="Email address"
            icon={<Mail size={16} />}
            placeholder="alex@company.com"
            error={errors.email?.message}
            {...register("email")}
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
            {isPending ? "Sending code..." : "Send code"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-5">
          Remembered your password?{" "}
          <Link to="/login" className="text-indigo-600 font-medium">
            Back to login
          </Link>
        </p>
      </div>
    </SplitAuthScreen>
  );
}
