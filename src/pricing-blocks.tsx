import React from "react";
import { motion } from "framer-motion";

export default function PricingSection() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 w-full mt-6 mb-8">
      {/* 1 Month Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 relative rounded-2xl border border-indigo-400/20 bg-slate-900/60 p-6 text-center shadow-lg backdrop-blur-md flex flex-col justify-center"
      >
        <div className="text-sm font-bold text-indigo-400 mb-1 uppercase tracking-wider">1 Month</div>
        <div className="text-3xl font-extrabold text-white">NPR 1000</div>
        <div className="text-xs text-slate-400 mt-2 font-medium">Standard Plan</div>
      </motion.div>

      {/* 3 Months Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 relative rounded-2xl border border-indigo-400/20 bg-slate-900/60 p-6 text-center shadow-lg backdrop-blur-md flex flex-col justify-center"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3 py-0.5 text-[10px] font-bold text-indigo-300 whitespace-nowrap">
          SAVE 23%
        </div>
        <div className="text-sm font-bold text-indigo-400 mb-1 uppercase tracking-wider">3 Months</div>
        <div className="text-3xl font-extrabold text-white">NPR 2300</div>
        <div className="text-xs text-slate-400 mt-2 font-medium">NPR 766 / mo</div>
      </motion.div>

      {/* 6 Months Card (Best Deal) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 relative rounded-2xl border-2 border-indigo-500 bg-gradient-to-b from-indigo-900/80 to-slate-900/80 p-6 text-center shadow-xl shadow-indigo-500/20 backdrop-blur-md scale-100 sm:scale-105 z-10 flex flex-col justify-center"
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-4 py-1 text-[11px] font-extrabold text-white shadow-lg whitespace-nowrap">
          BEST DEAL • 33% OFF
        </div>
        <div className="text-sm font-bold text-indigo-200 mb-1 uppercase tracking-wider">6 Months</div>
        <div className="text-3xl font-extrabold text-white">NPR 4000</div>
        <div className="text-xs text-indigo-200/70 mt-2 font-medium">NPR 666 / mo</div>
      </motion.div>
    </div>
  );
}
