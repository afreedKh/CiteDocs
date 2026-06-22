import { forwardRef, type InputHTMLAttributes, useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { FormField } from "./FormField";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <FormField
        ref={ref}
        label={label}
        error={error}
        type={visible ? "text" : "password"}
        icon={<Lock size={16} />}
        rightElement={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="text-slate-400 hover:text-slate-600"
            tabIndex={-1}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";