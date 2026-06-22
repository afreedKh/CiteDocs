import { forwardRef, type InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          {...props}
        />
        {label}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";