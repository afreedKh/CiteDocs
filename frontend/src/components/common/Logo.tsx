import { Brain } from "lucide-react";
import { IconBadge } from "./IconBadge";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <IconBadge icon={<Brain size={18} />} size="md" />
      <span className="text-lg font-bold text-slate-900">CiteDocs</span>
    </div>
  );
}