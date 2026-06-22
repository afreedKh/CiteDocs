import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
  rightElement?: ReactNode; // for the eye-toggle icon in PasswordInput
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, icon, error, rightElement, className = "", ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-900 mb-1.5">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`w-full bg-slate-100 rounded-lg py-2.5 ${icon ? "pl-10" : "pl-3.5"} 
                        ${rightElement ? "pr-10" : "pr-3.5"} text-sm text-slate-900 
                        placeholder:text-slate-400 outline-none
                        focus:ring-2 focus:ring-indigo-500 transition-shadow
                        ${error ? "ring-2 ring-red-400" : ""} ${className}`}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </span>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";