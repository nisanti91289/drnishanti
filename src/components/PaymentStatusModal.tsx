import { Check, X, ShieldAlert, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type PaymentStatus = "idle" | "processing" | "success" | "failed";

interface PaymentStatusModalProps {
  status: PaymentStatus;
  productName: string;
  amount: number;
  paymentId?: string;
  errorMessage?: string;
  onClose: () => void;
  onRetry?: () => void;
}

export default function PaymentStatusModal({
  status,
  productName,
  amount,
  paymentId,
  errorMessage,
  onClose,
  onRetry
}: PaymentStatusModalProps) {
  if (status === "idle") return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-brand-cream/50 overflow-hidden"
        >
          {/* Top subtle structural gradient */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-pink to-brand-gold" />

          {status === "processing" && (
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-brand-pink/20 border-t-brand-pink rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCw size={20} className="text-brand-pink animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-brand-dark">Initiating Secure Gateway</h3>
                <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                  Connecting to our verified merchant checkout. Please do not refresh or close this view.
                </p>
              </div>

              <div className="w-full text-xs text-gray-400 border-t border-brand-cream/30 pt-4 flex items-center justify-center gap-1.5">
                <ShieldAlert size={14} /> PCI-DSS Compliant Encryption
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                <Check size={32} strokeWidth={3} />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold text-brand-dark">Payment Confirmed!</h3>
                <p className="text-sm text-emerald-600 font-semibold px-3 py-1 bg-emerald-50 rounded-full inline-block">
                  Verified and Processed Securely
                </p>
                <p className="text-sm text-gray-500 max-w-xs pt-1">
                  Thank you! Your order for <strong>{productName}</strong> (₹{amount}) has been parsed successfully.
                </p>
              </div>

              {/* Transaction Recap */}
              <div className="w-full bg-brand-cream/15 border border-brand-cream/40 rounded-2xl p-4 text-left text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Product:</span>
                  <span className="text-brand-dark font-bold">{productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Paid Amount:</span>
                  <span className="text-emerald-600 font-extrabold text-sm">₹{amount}</span>
                </div>
                {paymentId && (
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">Gateway Code:</span>
                    <span className="text-brand-dark font-mono truncate max-w-[160px]">{paymentId}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Delivery:</span>
                  <span className="text-gray-500 font-bold">Free India Delivery Included</span>
                </div>
              </div>

              <div className="p-4 bg-brand-blue/5 rounded-2xl text-left border border-brand-blue/15">
                <p className="text-xs text-brand-blue/95 font-medium leading-relaxed">
                  ℹ️ <strong>Next Step:</strong> Dr. Nishanti's Clinical Care Team will contact you on your registered WhatsApp number to finalize delivery tracking.
                </p>
              </div>

              <div className="w-full flex gap-3">
                <button
                  onClick={onClose}
                  className="w-full py-3.5 bg-brand-dark text-white rounded-2xl font-bold text-sm transition-all hover:bg-brand-dark/90 active:scale-98"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}

          {status === "failed" && (
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
                <X size={32} strokeWidth={3} />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-brand-dark">Transaction Declined</h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  {errorMessage || "The checkout interface could not authorize the charge. Please try again."}
                </p>
              </div>

              <div className="w-full flex gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-3.5 border border-brand-cream bg-white text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="flex-1 py-3.5 bg-rose-500 text-white rounded-2xl font-bold text-sm hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/10"
                  >
                    Retry Payment
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
