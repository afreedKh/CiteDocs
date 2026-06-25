type Status = "Ready" | "Embedding" | "Parsing" | "Failed";

const styles: Record<Status, string> = {
  Ready: "bg-green-50 text-green-600 border border-green-200",
  Embedding: "bg-indigo-50 text-indigo-600 border border-indigo-200",
  Parsing: "bg-orange-50 text-orange-600 border border-orange-200",
  Failed: "bg-red-50 text-red-600 border border-red-200",
};

const icons: Record<Status, string> = {
  Ready: "✓",
  Embedding: "⟳",
  Parsing: "◷",
  Failed: "✕",
};

export function DocumentStatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium 
                      px-2.5 py-1 rounded-full ${styles[status]}`}>
      <span>{icons[status]}</span>
      {status}
    </span>
  );
}