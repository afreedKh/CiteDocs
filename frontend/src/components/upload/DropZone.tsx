import { useDropzone } from "react-dropzone";
import { CloudUpload } from "lucide-react";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

const ACCEPTED_TYPES = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "text/plain": [".txt"],
  "text/markdown": [".md"],
};

export function DropZone({ onFileSelect, selectedFile }: DropZoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPTED_TYPES,
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
    onDropAccepted: (files) => onFileSelect(files[0]),
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center 
                  justify-center cursor-pointer transition-colors
                  ${isDragActive
          ? "border-indigo-400 bg-indigo-50"
          : selectedFile
            ? "border-green-300 bg-green-50"
            : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50"
        }`}
    >
      <input {...getInputProps()} />

      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center 
                      justify-center mb-3">
        <CloudUpload size={22} className="text-slate-500" />
      </div>

      {selectedFile ? (
        <>
          <p className="text-sm font-semibold text-green-700">{selectedFile.name}</p>
          <p className="text-xs text-slate-400 mt-1">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB — click to change
          </p>
        </>
      ) : (
        <>
          <p className="text-sm font-semibold text-slate-800">
            {isDragActive ? "Drop it here..." : "Drop files here or browse"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Supports PDF, DOCX, TXT, Markdown
          </p>
          <div className="flex gap-2 mt-3">
            {[".pdf", ".docx", ".txt", ".md"].map((ext) => (
              <span key={ext}
                className="text-xs bg-white border border-slate-200 text-slate-500 
                           px-2.5 py-1 rounded-full">
                {ext}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}