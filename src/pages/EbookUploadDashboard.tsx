import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  Key, 
  RefreshCw, 
  Eye, 
  ShieldCheck,
  Search,
  BookOpen
} from "lucide-react";
import { EBOOKS_DATA } from "./Ebooks";
import { getApiUrl } from "../utils/api";

interface EbookFileStatus {
  id: string;
  exists: boolean;
  fileName?: string;
  error?: string;
}

export default function EbookUploadDashboard() {
  const [passcode, setPasscode] = useState(() => localStorage.getItem("ebook_admin_passcode") || "");
  const [unlocked, setUnlocked] = useState(false);
  const [passcodeError, setPasscodeError] = useState("");
  
  const [statuses, setStatuses] = useState<Record<string, EbookFileStatus>>({});
  const [loadingStatuses, setLoadingStatuses] = useState<Record<string, boolean>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadError, setUploadError] = useState<Record<string, string>>({});
  const [uploadSuccess, setUploadSuccess] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (passcode) {
      verifyPasscodeOnLoad();
    }
  }, []);

  const verifyPasscodeOnLoad = async () => {
    // Simple frontend pre-check to let us check statuses if passcode seems valid
    setUnlocked(true);
    checkAllFileStatuses();
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setPasscodeError("Please enter a passcode.");
      return;
    }
    // We strictly verify the passcode in the backend on uploads, but can do a pre-verify too or unlock locally.
    localStorage.setItem("ebook_admin_passcode", passcode);
    setUnlocked(true);
    setPasscodeError("");
    checkAllFileStatuses();
  };

  const logout = () => {
    localStorage.removeItem("ebook_admin_passcode");
    setPasscode("");
    setUnlocked(false);
  };

  const checkFileStatus = async (id: string) => {
    setLoadingStatuses(prev => ({ ...prev, [id]: true }));
    try {
      const res = await fetch(getApiUrl(`/api/ebooks/download-check/${id}`));
      if (res.ok) {
        const data = await res.json();
        setStatuses(prev => ({ 
          ...prev, 
          [id]: { id, exists: data.exists, fileName: data.fileName } 
        }));
      } else {
        setStatuses(prev => ({ 
          ...prev, 
          [id]: { id, exists: false } 
        }));
      }
    } catch (e) {
      setStatuses(prev => ({ 
        ...prev, 
        [id]: { id, exists: false, error: "Network check failed" } 
      }));
    } finally {
      setLoadingStatuses(prev => ({ ...prev, [id]: false }));
    }
  };

  const checkAllFileStatuses = () => {
    EBOOKS_DATA.forEach(book => {
      checkFileStatus(book.id);
    });
  };

  const handleFileUpload = async (ebookId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setUploadError(prev => ({ ...prev, [ebookId]: "Please upload a valid PDF file (.pdf) only." }));
      return;
    }

    setUploading(prev => ({ ...prev, [ebookId]: true }));
    setUploadProgress(prev => ({ ...prev, [ebookId]: 15 }));
    setUploadError(prev => ({ ...prev, [ebookId]: "" }));
    setUploadSuccess(prev => ({ ...prev, [ebookId]: false }));

    try {
      // Step 1: Read file as Base64 format
      const reader = new FileReader();
      reader.onload = async () => {
        setUploadProgress(prev => ({ ...prev, [ebookId]: 45 }));
        const base64Data = reader.result as string;
        
        setUploadProgress(prev => ({ ...prev, [ebookId]: 75 }));
        
        // Step 2: Post to our backend Replace API
        const response = await fetch(getApiUrl("/api/admin/upload-ebook"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            passcode,
            ebookId,
            fileData: base64Data
          })
        });

        const data = await response.json();
        setUploadProgress(prev => ({ ...prev, [ebookId]: 100 }));

        if (response.ok && data.success) {
          setUploadSuccess(prev => ({ ...prev, [ebookId]: true }));
          // Re-trigger live status checklist
          checkFileStatus(ebookId);
          setTimeout(() => {
            setUploading(prev => ({ ...prev, [ebookId]: false }));
          }, 1000);
        } else {
          setUploadError(prev => ({ ...prev, [ebookId]: data.error || "Server rejected the file upload." }));
          setUploading(prev => ({ ...prev, [ebookId]: false }));
        }
      };

      reader.onerror = () => {
        setUploadError(prev => ({ ...prev, [ebookId]: "Error reading local PDF file on device." }));
        setUploading(prev => ({ ...prev, [ebookId]: false }));
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setUploadError(prev => ({ ...prev, [ebookId]: err.message || "Failed to make endpoint fetch request." }));
      setUploading(prev => ({ ...prev, [ebookId]: false }));
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 md:px-8 mt-16 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb Header */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <Link 
            to="/ebooks" 
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-emerald-600 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={14} /> Back to Doctor eBooks catalog
          </Link>
          {unlocked && (
            <button 
              onClick={logout}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 border border-rose-200 bg-white px-4 py-1.5 rounded-full shadow-sm hover:shadow"
            >
              Sign Out from Admin Panel
            </button>
          )}
        </div>

        {/* Locked State: Login Portal */}
        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div 
              key="locked-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                  <Key size={30} className="animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-xl font-black text-gray-950">Director's eBook Dashboard</h1>
                <p className="text-xs text-gray-500 leading-normal">
                  Access passcode required to securely replace pre-designed eBook structures on the live portal.
                </p>
              </div>

              <form onSubmit={handleUnlock} className="space-y-4">
                <div className="text-left space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Passcode Verification</label>
                  <input 
                    type="password" 
                    placeholder="Enter admin passcode (e.g. admin123)"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-bold text-gray-950 placeholder-gray-400 bg-slate-50 focus:bg-white"
                  />
                  {passcodeError && (
                    <span className="text-[10px] font-semibold text-rose-500 block pt-1">{passcodeError}</span>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-emerald-500/20 active:translate-y-0.5 transition-all text-center"
                >
                  Verify credentials
                </button>
              </form>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-[11px] text-gray-400 leading-relaxed text-left">
                <strong>Doctor's Tip:</strong> This portal matches the original PDF files. Default passcode is <strong className="text-emerald-600">admin123</strong>. You can change this anytime mapping the <code>ADMIN_EBOOK_PASSCODE</code> variable inside your environment variables.
              </div>
            </motion.div>
          ) : (
            // Unlocked State: Premium Control Panel
            <motion.div 
              key="dashboard-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8 animate-fade-in"
            >
              
              {/* Informative Welcome Banner */}
              <div className="bg-emerald-650 text-white rounded-3xl p-6 md:p-8 space-y-4 shadow-lg relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-700">
                <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-10 pointer-events-none">
                  <BookOpen size={240} />
                </div>
                <div className="relative z-10 max-w-2xl space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/35 border border-emerald-300/20 rounded-full text-[9px] uppercase font-black tracking-widest text-emerald-100">
                    <ShieldCheck size={12} /> CLINIC SECURITY: VERIFIED
                  </div>
                  <h2 className="text-xl md:text-2xl font-black leading-tight text-white">eBook File Replacement Dashboard</h2>
                  <p className="text-xs md:text-sm text-emerald-100 leading-relaxed">
                    Welcome Dr. Nishanti! Replace on-the-fly simulated workbooks with your real beautiful high-resolution custom PDF books instantly. Buyers will fetch your custom PDFs as soon as you save them on this portal.
                  </p>
                </div>
              </div>

              {/* Status Header Checklist Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-slate-200 rounded-2xl px-6 py-4 gap-4 shadow-sm">
                <div>
                  <h3 className="text-xs font-bold text-gray-950 uppercase tracking-widest text-slate-400">Database Status Checklist</h3>
                  <p className="text-xs text-slate-500 pt-0.5">Real-time mapping status of clinical products in active directories.</p>
                </div>
                <button 
                  onClick={checkAllFileStatuses}
                  className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 px-4 py-2 rounded-full font-bold text-xs cursor-pointer shadow-sm hover:shadow"
                >
                  <RefreshCw size={12} className="animate-spin-slow" /> Reset / Refresh Statuses
                </button>
              </div>

              {/* Grid List of all eBooks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {EBOOKS_DATA.map((book) => {
                  const statusInfo = statuses[book.id];
                  const isLoading = loadingStatuses[book.id];
                  const isCurUploading = uploading[book.id];
                  const progress = uploadProgress[book.id] || 0;
                  const errText = uploadError[book.id];
                  const isSuccess = uploadSuccess[book.id];

                  return (
                    <div 
                      key={book.id} 
                      className="bg-white border border-slate-200 hover:border-slate-350 rounded-2xl p-6 shadow-sm hover:shadow relative flex flex-col justify-between transition-all"
                    >
                      
                      {/* Section 1: Book Info */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-3">
                          <span 
                            className="inline-flex items-center gap-1 text-[10px] uppercase font-black px-2.5 py-1 rounded-md text-emerald-700 bg-emerald-50 border border-emerald-100"
                            style={{ backgroundColor: book.colorTheme.bgSubtle, color: book.colorTheme.accent, borderColor: book.colorTheme.accent + "20" }}
                          >
                            <FileText size={11} /> {book.id}
                          </span>
                          
                          {/* Live server checking badge */}
                          {isLoading ? (
                            <span className="text-[10px] text-gray-400 font-semibold uppercase animate-pulse flex items-center gap-1">
                              <RefreshCw size={10} className="animate-spin" /> checking...
                            </span>
                          ) : statusInfo?.exists ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                              <CheckCircle size={11} /> Live File On Portal
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100/50">
                              <AlertTriangle size={11} /> Dynamic Fallback Mode
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-black text-gray-950 line-clamp-1">{book.title}</h4>
                          <span className="text-[11px] text-gray-400 font-bold block pt-0.5">Author: {book.author} — ₹{book.price}</span>
                        </div>

                        <p className="text-xs text-gray-500 leading-normal line-clamp-2">
                          {book.introduction}
                        </p>

                        {/* File details or warnings */}
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-[11px] text-gray-500">
                          <div className="flex justify-between font-semibold">
                            <span>Expected Filename:</span>
                            <code className="text-[10px] font-mono select-all text-slate-800 bg-slate-200/50 px-1.5 rounded">{book.id}.pdf map as detailed</code>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <span>
                              {statusInfo?.exists 
                                ? <strong className="text-emerald-600">Serves custom PDF directly on downloads</strong>
                                : <strong className="text-slate-500">Serves instant on-the-fly programmatic guide</strong>}
                            </span>
                          </div>
                          {statusInfo?.exists && statusInfo.fileName && (
                            <div className="flex justify-between font-semibold pt-1 text-slate-500 border-t border-slate-200/60">
                              <span>Local File Target:</span>
                              <span className="text-[9px] font-mono truncate max-w-[200px]">{statusInfo.fileName}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Section 2: Action upload area */}
                      <div className="pt-4 mt-6 border-t border-slate-100 space-y-4">
                        
                        {/* Error and Success Indicators */}
                        {errText && (
                          <div className="p-2.5 bg-rose-50 border border-rose-200/60 rounded-xl text-[10px] font-semibold text-rose-500 flex items-start gap-1.5">
                            <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
                            <span>{errText}</span>
                          </div>
                        )}

                        {isSuccess && (
                          <div className="p-2.5 bg-emerald-50 border border-emerald-200/60 rounded-xl text-[10px] font-bold text-emerald-600 flex items-center gap-1.5">
                            <CheckCircle size={12} className="flex-shrink-0" />
                            <span>eBook PDF updated successfully! Changes are live immediately.</span>
                          </div>
                        )}

                        {/* Upload Loader bar */}
                        {isCurUploading && (
                          <div className="space-y-1.5">
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-emerald-500 h-2 rounded-full transition-all duration-150" 
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider block text-center animate-pulse">
                              Replacing file buffers in database... {progress}%
                            </span>
                          </div>
                        )}

                        {/* Interactive triggers */}
                        {!isCurUploading && (
                          <div className="flex gap-2">
                            {/* Hidden local input */}
                            <label className="flex-1">
                              <input 
                                type="file" 
                                accept="application/pdf"
                                onChange={(e) => handleFileUpload(book.id, e)}
                                className="hidden"
                              />
                              <div className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-full font-bold text-xs shadow-sm hover:shadow cursor-pointer transition-all">
                                <UploadCloud size={14} /> Upload Custom PDF Now
                              </div>
                            </label>

                            {/* View Live Original fallback if exists */}
                            {statusInfo?.exists && (
                              <a 
                                href={getApiUrl(`/api/download-ebook/${book.id}`)}
                                download
                                className="inline-flex items-center justify-center w-10 h-10 border border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-600 rounded-full transition-all shadow-sm"
                                title="Download current real PDF from server"
                              >
                                <Download size={14} />
                              </a>
                            )}
                          </div>
                        )}

                      </div>

                    </div>
                  );
                })}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
