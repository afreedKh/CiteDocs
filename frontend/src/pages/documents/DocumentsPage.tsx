import { useState } from "react";
import { FileText, Upload, Search, Filter, ArrowUpDown,
         AlertTriangle, X } from "lucide-react";
import { motion } from "framer-motion";
import { DocumentStatusBadge } from "../../components/documents/DocumentStatusBadge";
import { DocumentTypeBadge } from "../../components/documents/DocumentTypeBadge";
import { UploadModal } from "../../components/upload/UploadModal";

// Stub data — replaced with real API on Day 5
const STUB_DOCUMENTS = [
  { id: "1", name: "Q4 Financial Analysis Report.pdf", uploader: "Alex Johnson",
    category: "Finance", type: "PDF" as const, size: "4.2 MB",
    status: "Ready" as const, date: "Dec 15, 2024" },
  { id: "2", name: "Product Roadmap 2025.docx", uploader: "Morgan Kim",
    category: "Product", type: "DOCX" as const, size: "1.8 MB",
    status: "Embedding" as const, date: "Dec 14, 2024" },
  { id: "3", name: "Employment Contract Template.pdf", uploader: "Sarah Roberts",
    category: "HR", type: "PDF" as const, size: "892 KB",
    status: "Ready" as const, date: "Dec 13, 2024" },
  { id: "4", name: "AI Research Summary.md", uploader: "Alex Johnson",
    category: "Research", type: "MD" as const, size: "124 KB",
    status: "Parsing" as const, date: "Dec 12, 2024" },
  { id: "5", name: "Sales Training Manual.pdf", uploader: "Lucas Park",
    category: "Sales", type: "PDF" as const, size: "7.4 MB",
    status: "Ready" as const, date: "Dec 11, 2024" },
  { id: "6", name: "Architecture Decision Records.txt", uploader: "Taylor Chen",
    category: "Engineering", type: "TXT" as const, size: "56 KB",
    status: "Failed" as const, date: "Dec 10, 2024" },
];

export function DocumentsPage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [errorDismissed, setErrorDismissed] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = STUB_DOCUMENTS.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Documents</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {STUB_DOCUMENTS.length} documents across all workspaces
          </p>
        </div>
        <motion.button
          onClick={() => setIsUploadOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white 
                     bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg"
        >
          <Upload size={15} />
          Upload Document
        </motion.button>
      </div>

      {/* Error banner */}
      {!errorDismissed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-red-50 border border-red-200 
                     text-red-700 text-sm rounded-lg px-4 py-3 mb-4"
        >
          <AlertTriangle size={16} className="shrink-0" />
          <span>
            Failed to embed 'Corrupted_file.pdf' — the file appears to be damaged.
            Try re-uploading.
          </span>
          <button
            onClick={() => setErrorDismissed(true)}
            className="ml-auto text-red-400 hover:text-red-600"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}

      {/* Search + filter row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 bg-white border border-slate-200 
                        rounded-lg px-3 py-2 flex-1 max-w-sm">
          <Search size={14} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="text-sm text-slate-800 outline-none flex-1 
                       placeholder:text-slate-400"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 
                           bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
          <Filter size={14} />
          Filter
        </button>
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 
                           bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
          <ArrowUpDown size={14} />
          Sort
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[2rem_1fr_80px_80px_120px_100px] 
                        gap-4 px-4 py-3 border-b border-slate-100 bg-slate-50">
          <input type="checkbox" className="w-4 h-4 rounded" />
          <span className="text-xs font-semibold text-slate-500 uppercase 
                           tracking-wide">Document</span>
          <span className="text-xs font-semibold text-slate-500 uppercase 
                           tracking-wide">Type</span>
          <span className="text-xs font-semibold text-slate-500 uppercase 
                           tracking-wide">Size</span>
          <span className="text-xs font-semibold text-slate-500 uppercase 
                           tracking-wide">Status</span>
          <span className="text-xs font-semibold text-slate-500 uppercase 
                           tracking-wide">Date</span>
        </div>

        {/* Rows */}
        {filtered.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-[2rem_1fr_80px_80px_120px_100px] gap-4 
                       px-4 py-3.5 border-b border-slate-50 hover:bg-slate-50 
                       transition-colors items-center"
          >
            <input type="checkbox" className="w-4 h-4 rounded" />
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center 
                              justify-center shrink-0">
                <FileText size={15} className="text-indigo-500" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {doc.name}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {doc.uploader} · {doc.category}
                </p>
              </div>
            </div>
            <DocumentTypeBadge type={doc.type} />
            <span className="text-sm text-slate-500">{doc.size}</span>
            <DocumentStatusBadge status={doc.status} />
            <span className="text-sm text-slate-400">{doc.date}</span>
          </motion.div>
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            No documents found.
          </div>
        )}
      </div>

      {/* Upload modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </div>
  );
}