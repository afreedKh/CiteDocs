import { AlertCircle } from "lucide-react";

export function FormError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-4">
      <AlertCircle size={16} />
      <span>{message}</span>
    </div>
  );
}