interface DividerProps {
  text: string;
}

export function Divider({ text }: DividerProps) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-slate-200" />
      <span className="text-xs text-slate-400">{text}</span>
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  );
}