import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { User, Mail } from "lucide-react";
import { SplitAuthScreen } from "../../components/layout/SplitAuthScreen";
import { AvatarStack } from "../../components/layout/AvatarStack";
import { Logo } from "../../components/common/Logo";
import { GoogleButton } from "../../components/common/GoogleButton";
import { Divider } from "../../components/common/Divider";
import { FormField } from "../../components/forms/FormField";
import { PasswordInput } from "../../components/forms/PasswordInput";
import {
  signupSchema,
  type SignupFormData,
} from "../../lib/validation/authSchemas";
import { Link } from "react-router-dom";
import { useSignup } from "../../lib/hooks/useAuth";
import { FormError } from "../../components/forms/FormError";

export function SignupPage() {
  const { mutate: signup, isPending, isError, error } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // Stub submit — real API call comes Day 3
  const onSubmit = (data: SignupFormData) => {
    signup({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <SplitAuthScreen
      panel={
        <div className="w-full">
          <h2 className="text-3xl font-bold text-white leading-snug">
            Your second brain, powered by AI
          </h2>
          <p className="text-slate-400 mt-4 max-w-sm">
            Upload documents, ask questions, and let CiteDocs surface the
            knowledge you need — instantly.
          </p>
          <div className="mt-8">
            <AvatarStack />
            <p className="text-slate-400 text-sm mt-3">
              Join 12,000+ teams already using CiteDocs
            </p>
          </div>
        </div>
      }
    >
      <Logo />

      <h1 className="text-2xl font-bold text-slate-900 mt-6">
        Create your workspace
      </h1>
      <p className="text-slate-500 text-sm mt-1">
        Start organizing your knowledge with AI
      </p>

      <div className="mt-6">
        <GoogleButton
          onClick={() => console.log("Google OAuth - wired Day 3")}
        />
        <Divider text="or sign up with email" />
        {isError && (
          <FormError
            message={
              (error as any)?.response?.data?.message ||
              "Something went wrong. Please try again."
            }
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField
            label="Full name"
            icon={<User size={16} />}
            placeholder="Alex Johnson"
            error={errors.fullName?.message}
            {...register("fullName")}
          />

          <FormField
            label="Email address"
            icon={<Mail size={16} />}
            placeholder="alex@company.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordInput
            label="Password"
            placeholder="Min. 8 characters"
            error={errors.password?.message}
            {...register("password")}
          />

          <PasswordInput
            label="Confirm password"
            placeholder="Repeat password"
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
                      disabled:opacity-50 mt-2"
          >
            {isPending ? "Creating account..." : "Create Account"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </SplitAuthScreen>
  );
}
