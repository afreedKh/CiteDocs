import { useState } from "react";
import { X, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DropZone } from "./DropZone";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [workspace, setWorkspace] = useState("Finance");
  const [visibility, setVisibility] = useState("Private");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(["Finance", "Q4"]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const val = tagInput.trim().replace(",", "");
      if (val && !tags.includes(val)) setTags([...tags, val]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleUpload = () => {
    if (!file) return;
    console.log("Uploading:", { file, workspace, visibility, tags });
    // Real upload wired on Day 5
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 
                              border-b border-slate-100">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Upload Documents
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center 
                             justify-center text-slate-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-4">

                {/* Dropzone */}
                <DropZone onFileSelect={setFile} selectedFile={file} />

                {/* Workspace + Visibility */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-700 mb-1 block">
                      Workspace
                    </label>
                    <select
                      value={workspace}
                      onChange={(e) => setWorkspace(e.target.value)}
                      className="w-full bg-slate-100 rounded-lg px-3 py-2 text-sm 
                                 text-slate-800 outline-none focus:ring-2 
                                 focus:ring-indigo-500"
                    >
                      {["Finance", "Product", "Legal", "HR", "Engineering"].map(
                        (w) => <option key={w}>{w}</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 mb-1 block">
                      Visibility
                    </label>
                    <select
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="w-full bg-slate-100 rounded-lg px-3 py-2 text-sm 
                                 text-slate-800 outline-none focus:ring-2 
                                 focus:ring-indigo-500"
                    >
                      {["Private", "Shared", "Public"].map(
                        (v) => <option key={v}>{v}</option>
                      )}
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1 block">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs bg-indigo-50 
                                   text-indigo-700 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-indigo-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tags (comma separated)..."
                    className="w-full bg-slate-100 rounded-lg px-3 py-2 text-sm 
                               text-slate-800 placeholder:text-slate-400 outline-none 
                               focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 pb-5">
                <span className="text-xs text-slate-400">Max file size: 50 MB</span>
                <div className="flex gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 
                               rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={handleUpload}
                    disabled={!file}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
                               text-white bg-gradient-to-r from-indigo-600 to-purple-600 
                               rounded-lg disabled:opacity-50 transition-opacity"
                  >
                    <Upload size={14} />
                    Upload
                  </motion.button>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}