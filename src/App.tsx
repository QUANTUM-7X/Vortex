import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Background } from "./components/Background";
import { UploadSection } from "./components/UploadSection";
import { AnalysisDashboard } from "./components/AnalysisDashboard";
import { analyzeTradingChart, AnalysisResult } from "./services/geminiService";
import { AlertCircle, X, ShieldCheck, Zap, Cpu, Infinity, RefreshCw } from "lucide-react";

export default function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (base64: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const analysis = await analyzeTradingChart(base64);
      setResult(analysis);
    } catch (err: any) {
      setError(err.message || "Quantum synchronization failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen relative font-sans text-white/90 selection:bg-vortex-cyan/30 overflow-x-hidden">
      <Background />

      {/* Status Bar - Mobile Optimized */}
      <div className="fixed top-0 left-0 right-0 z-50 h-10 bg-black/60 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Cpu size={12} className="text-vortex-cyan animate-pulse" />
          <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">Quantum Vortex vX</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={12} className="text-emerald-500" />
          <span className="text-[8px] font-black text-emerald-500/80 uppercase tracking-widest">Secure</span>
        </div>
      </div>

      <main className="pt-16 px-4 pb-20 min-h-screen flex flex-col">
        
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key="upload-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full"
            >
              {/* Hero Title */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
                >
                  <Zap size={12} className="text-magma-gold" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-magma-gold">Zero-Loss Protocol Active</span>
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-white mb-2 drop-shadow-2xl">
                  QUANTUM<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-vortex-cyan to-plasma-pink">VORTEX</span>
                </h1>
                <p className="text-xs font-medium text-white/40 tracking-widest uppercase">
                  Autonomous Trading Intelligence
                </p>
              </div>

              {/* Upload Area */}
              <div className="w-full">
                <UploadSection 
                  onUpload={handleUpload} 
                  isAnalyzing={isAnalyzing} 
                />
              </div>

              {/* Footer Credits */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex items-center gap-2 opacity-30"
              >
                <Infinity size={12} />
                <span className="text-[8px] font-black uppercase tracking-[0.3em]">David Mamun William</span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="result-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md mx-auto"
            >
              {/* Reset Button */}
              <motion.button
                onClick={resetAnalysis}
                whileTap={{ scale: 0.95 }}
                className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mx-auto"
              >
                <RefreshCw size={12} className="text-white/60" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">New Analysis</span>
              </motion.button>

              <AnalysisDashboard result={result} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Toast */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-8 left-4 right-4 z-50 flex justify-center"
            >
              <div className="bg-rose-500/10 backdrop-blur-xl border border-rose-500/20 text-rose-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-sm w-full">
                <AlertCircle size={20} className="shrink-0" />
                <span className="text-xs font-bold">{error}</span>
                <button onClick={() => setError(null)} className="ml-auto p-1 hover:bg-white/10 rounded-full">
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
  }
