import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Sparkles, Zap, Shield } from "lucide-react";
import { SplitAuthScreen } from "../../components/layout/SplitAuthScreen";
import { FeatureCard } from "../../components/layout/FeatureCard";
import { Logo } from "../../components/common/Logo";
import { GoogleButton } from "../../components/common/GoogleButton";
import { Divider } from "../../components/common/Divider";
import { FormField } from "../../components/forms/FormField";
import { PasswordInput } from "../../components/forms/PasswordInput";
import { Checkbox } from "../../components/forms/Checkbox";
import { loginSchema } from "../../lib/validation/authSchemas";
import type { LoginFormData } from "../../lib/validation/authSchemas";
import { Link } from "react-router-dom";
import { useLogin } from "../../lib/hooks/useAuth";
import { FormError } from "../../components/forms/FormError";

export function LoginPage() {
  const { mutate: login, isPending, isError, error } = useLogin();
 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })


  const onSubmit = (data: LoginFormData) => {
  login({ email: data.email, password: data.password });
};

  return (
    <SplitAuthScreen
      panel={
        <div className="w-full">
          <div className="space-y-4">
              <FeatureCard
                icon={<Sparkles size={18} />}
                title="AI-Powered RAG"
                description="Ask questions, get answers grounded in your documents"
                delay={0.1}
              />
              <FeatureCard
                icon={<Zap size={18} />}
                title="Instant Retrieval"
                description="Sub-second semantic search across all your knowledge"
                delay={0.25}
              />
              <FeatureCard
                icon={<Shield size={18} />}
                title="Enterprise Security"
                description="SOC 2 compliant with end-to-end encryption"
                delay={0.4}
              />
            </div>
          <div className="mt-6 inline-block bg-white/10 text-slate-200 text-xs px-4 py-1.5 rounded-full">
            Trusted by 12,000+ knowledge workers
          </div>
        </div>
      }
    >
      <Logo />

      <h1 className="text-2xl font-bold text-slate-900 mt-6">Welcome back</h1>
      <p className="text-slate-500 text-sm mt-1">Sign in to your knowledge workspace</p>

      <div className="mt-6">
        <GoogleButton onClick={() => console.log("Google OAuth - wired Day 3")} />
        <Divider text="or continue with email" />
          {isError && (
            <FormError
              message={
                (error as any)?.response?.data?.message || "Invalid email or password"
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

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex items-center justify-between mb-5">
            <Checkbox label="Remember me" {...register("rememberMe")} />
            <Link to="/forgot-password" className="text-sm text-indigo-600 font-medium">
              Forgot password?
            </Link>
          </div>

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
            {isPending ? "Signing in..." : "Sign in to CiteDocs"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-medium">
            Create account
          </Link>
        </p>
      </div>
    </SplitAuthScreen>
  );
}