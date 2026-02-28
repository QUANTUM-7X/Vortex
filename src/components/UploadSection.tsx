import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload as UploadIcon, FileImage, Loader2, ScanLine, Zap, ShieldCheck } from "lucide-react";

interface UploadSectionProps {
  onUpload: (base64: string) => void;
  isAnalyzing: boolean;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onUpload, isAnalyzing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onUpload(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="w-full max-w-sm mx-auto relative"
    >
      {/* Glow Effect Behind Box */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-vortex-cyan/20 via-plasma-pink/20 to-magma-gold/20 rounded-3xl blur-xl transition-opacity duration-500 ${isDragging || isAnalyzing ? 'opacity-100' : 'opacity-0'}`} />

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        onClick={() => !isAnalyzing && fileInputRef.current?.click()}
        className={`relative cursor-pointer transition-all duration-500 rounded-3xl overflow-hidden border ${
          isDragging ? 'border-vortex-cyan/50 bg-vortex-cyan/10 scale-[1.02] shadow-[0_0_40px_rgba(34,211,238,0.3)]' : 'border-white/10 bg-black/40 hover:bg-white/5 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]'
        } backdrop-blur-2xl p-8 text-center shadow-2xl group`}
      >
        {/* Scanning Line Animation */}
        {isAnalyzing && (
          <motion.div
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-vortex-cyan to-transparent z-20 shadow-[0_0_20px_rgba(34,211,238,1)]"
          />
        )}

        <div className="relative z-10 flex flex-col items-center gap-5">
          <div className="relative">
            {/* Outer Rotating Ring */}
            <motion.div
              animate={isAnalyzing ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className={`absolute -inset-4 rounded-full border border-dashed ${isAnalyzing ? 'border-vortex-cyan/50' : 'border-white/10'}`}
            />
            {/* Inner Icon Container */}
            <motion.div
              whileHover={!isAnalyzing ? { scale: 1.1 } : {}}
              className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${
                isAnalyzing ? 'from-vortex-cyan/20 to-plasma-pink/20 border-vortex-cyan/30' : 'from-white/5 to-white/2 border-white/10'
              } border shadow-inner relative z-10`}
            >
              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <ScanLine size={24} className="text-vortex-cyan animate-pulse" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <UploadIcon size={24} className="text-white/60" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-display font-black tracking-tight text-white">
              {isAnalyzing ? 'Quantum Scan Active' : 'Inject Chart Data'}
            </h3>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
              {isAnalyzing ? 'Neural mapping in progress...' : 'Tap or drop screenshot'}
            </p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            accept="image/*"
          />

          {/* Analysis Progress Steps */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full mt-2 space-y-3"
              >
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-vortex-cyan to-transparent"
                  />
                </div>
                <div className="flex flex-col gap-2 text-left bg-black/20 p-3 rounded-xl border border-white/5">
                  {[
                    { text: "Fractal Mapping", icon: ScanLine, color: "text-vortex-cyan" },
                    { text: "Whale Intention Scan", icon: Zap, color: "text-plasma-pink" },
                    { text: "API Data Fusion", icon: ScanLine, color: "text-emerald-400" },
                    { text: "Zero-Loss Verification", icon: ShieldCheck, color: "text-magma-gold" }
                  ].map((step, i) => (
                    <motion.div 
                      key={step.text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <step.icon size={10} className={`${step.color} animate-pulse`} />
                      <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">{step.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Premium Corner Accents */}
        <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-white/20 rounded-tl-sm" />
        <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-white/20 rounded-tr-sm" />
        <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-white/20 rounded-bl-sm" />
        <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-white/20 rounded-br-sm" />
      </div>
    </motion.div>
  );
};
