"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useStore } from "@/components/providers/store-provider";

export function ToastCenter() {
  const { toasts, dismissToast } = useStore();

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex w-[min(92vw,360px)] flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.button
            key={toast.id}
            type="button"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            onClick={() => dismissToast(toast.id)}
            className="pointer-events-auto flex items-center gap-3 rounded-3xl border border-black/8 bg-white/95 px-4 py-4 text-left shadow-[0_30px_80px_-55px_rgba(17,17,17,0.65)] backdrop-blur-xl"
          >
            <span
              className={`rounded-full p-2 ${
                toast.tone === "success"
                  ? "bg-emerald-100 text-emerald-700"
                  : toast.tone === "error"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-[#C9A96E]/15 text-[#111111]"
              }`}
            >
              {toast.tone === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            </span>
            <span className="text-sm text-[#111111]">{toast.title}</span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
