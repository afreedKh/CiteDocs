type DocType = "PDF" | "DOCX" | "TXT" | "MD";

const styles: Record<DocType, string> = {
  PDF: "bg-red-100 text-red-700",
  DOCX: "bg-blue-100 text-blue-700",
  TXT: "bg-slate-100 text-slate-600",
  MD: "bg-slate-100 text-slate-600",
};

export function DocumentTypeBadge({ type }: { type: DocType }) {
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded 
                      ${styles[type]}`}>
      {type}
    </span>
  );
}