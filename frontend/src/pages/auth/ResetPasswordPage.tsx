import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Navigate } from "react-router-dom";
import { SplitAuthScreen } from "../../components/layout/SplitAuthScreen";
import { FeatureCard } from "../../components/layout/FeatureCard";
import { Logo } from "../../components/common/Logo";
import { PasswordInput } from "../../components/forms/PasswordInput";
import { FormError } from "../../components/forms/FormError";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../../lib/validation/authSchemas";
import { useResetPassword } from "../../lib/hooks/useAuth";
import { useAuthStore } from "../../lib/store/authStore";

export function ResetPasswordPage() {
  const resetToken = useAuthStore((state) => state.resetToken);
  const {
    mutate: resetPassword,
    isPending,
    isError,
    error,
  } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // No verified reset token — skip straight back to the start of the flow.
  if (!resetToken) {
    return <Navigate to="/forgot-password" replace />;
  }

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword(data.newPassword);
  };

  return (
    <SplitAuthScreen
      panel={
        <div className="w-full">
          <FeatureCard
            icon={<Lock size={18} />}
            title="Set a new password"
            description="Choose something you haven't used before"
            delay={0.1}
          />
        </div>
      }
    >
      <Logo />

      <h1 className="text-2xl font-bold text-slate-900 mt-6">New password</h1>
      <p className="text-slate-500 text-sm mt-1">
        Enter and confirm your new password
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
          <PasswordInput
            label="New password"
            placeholder="Enter a new password"
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />

          <PasswordInput
            label="Confirm password"
            placeholder="Re-enter your new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
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
            {isPending ? "Saving..." : "Reset password"}
          </motion.button>
        </form>
      </div>
    </SplitAuthScreen>
  );
}
