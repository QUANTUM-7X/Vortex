import React from "react";
import { motion } from "motion/react";
import { AnalysisResult } from "../services/geminiService";
import { TrendingUp, TrendingDown, Minus, Clock, Globe, ShieldCheck, Zap, Target, Brain, ShieldAlert, Waves, BarChart3, Fingerprint, Gauge, Cpu, Activity, Orbit, Share2, Sparkles, Download, RefreshCw, Infinity as InfinityIcon, Smartphone, Layers, ZapOff } from "lucide-react";

interface AnalysisDashboardProps {
  result: AnalysisResult;
}

// --- Components ---

const PredictionSphere = ({ probability }: { probability: number }) => {
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-[2px] border-vortex-cyan/50 rounded-full border-t-transparent border-l-transparent shadow-[0_0_15px_rgba(34,211,238,0.4)]"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-1 border-[1px] border-plasma-pink/50 rounded-full border-b-transparent border-r-transparent border-dashed"
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-br from-vortex-cyan/30 to-plasma-pink/30 blur-xl rounded-full"
      />
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-xl md:text-2xl font-display font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{probability}%</span>
        <span className="text-[5px] font-black text-white/70 uppercase tracking-widest mt-0.5">Win Rate</span>
      </div>
    </div>
  );
};

const SignalCard = ({ result }: { result: AnalysisResult }) => {
  const isCall = result.signal === "CALL";
  const isPut = result.signal === "PUT";
  const color = isCall ? "emerald" : isPut ? "rose" : "gray";
  const Icon = isCall ? TrendingUp : isPut ? TrendingDown : Minus;
  
  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`relative overflow-hidden rounded-[24px] p-[1px] bg-gradient-to-br from-white/20 to-white/5 shadow-2xl ${isCall ? 'shadow-emerald-500/30' : 'shadow-rose-500/30'}`}
    >
      <div className={`absolute inset-0 bg-${color}-500/20 blur-3xl`} />
      <div className="relative bg-black/60 backdrop-blur-2xl rounded-[23px] p-5 flex flex-col items-center text-center border border-white/5">
        
        {/* Top Badges */}
        <div className="flex items-center gap-2 mb-4 w-full justify-between">
          <motion.span 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`px-2.5 py-1 rounded-full text-[7px] font-black uppercase tracking-widest bg-${color}-500/10 text-${color}-400 border border-${color}-500/20 flex items-center gap-1`}
          >
            <Smartphone size={8} />
            {result.broker}
          </motion.span>
          <motion.span 
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-2.5 py-1 rounded-full text-[7px] font-black uppercase tracking-widest bg-white/5 text-white/60 border border-white/10 flex items-center gap-1"
          >
            <Clock size={8} />
            {result.countryTime.split('|')[1] || "LIVE"}
          </motion.span>
        </div>
        
        {/* Main Signal Icon */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.6, delay: 0.1 }}
          className={`w-16 h-16 rounded-full bg-gradient-to-br from-${color}-500 to-${color}-700 flex items-center justify-center mb-3 shadow-[0_0_40px_rgba(0,0,0,0.6)] border-2 border-white/20 relative`}
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute inset-0 rounded-full bg-${color}-500/50`}
          />
          <Icon size={28} className="text-white drop-shadow-lg relative z-10" />
        </motion.div>
        
        {/* Signal Text */}
        <motion.h2 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`text-5xl md:text-6xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-2 drop-shadow-2xl`}
        >
          {result.signal}
        </motion.h2>
        
        {/* Pair & Forecast */}
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2.5 text-[10px] font-bold text-white/80 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
        >
          <span className="text-vortex-cyan">{result.pair}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="text-magma-gold">{result.candleForecast}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StatRow = ({ label, value, icon: Icon, colorClass, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, type: "spring" }}
    className="flex items-center justify-between p-2.5 rounded-[16px] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm"
  >
    <div className="flex items-center gap-2.5">
      <div className={`p-1.5 rounded-lg bg-black/40 ${colorClass} shadow-inner border border-white/5`}>
        <Icon size={12} />
      </div>
      <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">{label}</span>
    </div>
    <span className="text-[11px] font-black text-white tracking-wide">{value}</span>
  </motion.div>
);

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ result }) => {
  return (
    <div className="w-full max-w-sm mx-auto space-y-3 pb-10">
      
      {/* Main Signal */}
      <SignalCard result={result} />

      {/* Probability & Stats Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="col-span-2 rounded-[20px] p-4 flex items-center justify-between bg-gradient-to-r from-vortex-cyan/10 via-black/40 to-plasma-pink/10 border border-white/10 backdrop-blur-xl shadow-xl"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.2em] flex items-center gap-1">
              <Target size={8} className="text-vortex-cyan" />
              Accuracy Matrix
            </span>
            <span className="text-2xl font-display font-black text-white drop-shadow-md">{result.probability}%</span>
          </div>
          <PredictionSphere probability={result.probability} />
        </motion.div>
        
        <StatRow label="Safety" value={`${result.safetyScore}%`} icon={ShieldCheck} colorClass="text-emerald-400" delay={0.7} />
        <StatRow label="MTG" value={result.mtgSuggestion} icon={Layers} colorClass="text-plasma-pink" delay={0.8} />
        <StatRow label="Forecast" value={result.candleForecast} icon={Waves} colorClass="text-vortex-cyan" delay={0.9} />
        <StatRow label="Expiry" value={result.countdown} icon={Clock} colorClass="text-magma-gold" delay={1.0} />
      </div>

      {/* Reasoning */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="rounded-[20px] p-4 border border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-vortex-cyan to-plasma-pink" />
        <div className="flex items-center gap-1.5 mb-2">
          <Brain size={12} className="text-vortex-cyan" />
          <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">AI Logic Core</span>
        </div>
        <p className="text-[10px] leading-relaxed text-white/60 font-medium">
          {result.reasoning}
        </p>
      </motion.div>

      {/* API Data Fusion Status */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.12 }}
        className="rounded-[20px] p-4 border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-10 -mt-10" />
        <div className="flex items-center gap-1.5 mb-3 relative z-10">
          <Activity size={12} className="text-emerald-400 animate-pulse" />
          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Live Market Fusion</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 relative z-10">
          <div className="flex items-center gap-2 bg-black/40 p-2 rounded-xl border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest">AlphaVantage</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 p-2 rounded-xl border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest">Finnhub</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 p-2 rounded-xl border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest">TAAPI</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 p-2 rounded-xl border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest">Twelvedata</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 p-2 rounded-xl border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest">DeepSeek</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 p-2 rounded-xl border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest">OpenAI</span>
          </div>
        </div>
      </motion.div>

      {/* Multiverse Forecasting */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15 }}
        className="rounded-[20px] p-4 border border-vortex-cyan/20 bg-vortex-cyan/5 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-vortex-cyan/10 blur-3xl rounded-full -mr-10 -mt-10" />
        <div className="flex items-center gap-1.5 mb-3 relative z-10">
          <Orbit size={12} className="text-vortex-cyan animate-[spin_4s_linear_infinite]" />
          <span className="text-[9px] font-black text-vortex-cyan uppercase tracking-widest">Multiverse Forecast (42 Timelines)</span>
        </div>
        
        <div className="space-y-2 relative z-10">
          <div className="flex items-center justify-between text-[8px] font-bold text-white/50 uppercase tracking-widest">
            <span>Timeline-A (Continuation)</span>
            <span className="text-emerald-400">Rejected</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500/30 w-[30%]" />
          </div>

          <div className="flex items-center justify-between text-[8px] font-bold text-white/50 uppercase tracking-widest pt-1">
            <span>Timeline-C (Liquidity Hunt)</span>
            <span className="text-rose-400">Rejected</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500/30 w-[15%]" />
          </div>

          <div className="flex items-center justify-between text-[8px] font-black text-vortex-cyan uppercase tracking-widest pt-1">
            <span>Timeline-Ω (Absolute Profit)</span>
            <span className="text-vortex-cyan animate-pulse">Selected</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden shadow-[0_0_10px_rgba(34,211,238,0.3)]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-vortex-cyan to-plasma-pink" 
            />
          </div>
        </div>
      </motion.div>

      {/* Zero Loss Protocol */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="rounded-[20px] p-4 border border-magma-gold/20 bg-magma-gold/5 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-magma-gold/10 blur-3xl rounded-full -mr-8 -mt-8" />
        <div className="flex items-center gap-1.5 mb-2 relative z-10">
          <ShieldAlert size={12} className="text-magma-gold animate-pulse" />
          <span className="text-[9px] font-black text-magma-gold uppercase tracking-widest">Zero-Loss Protocol</span>
        </div>
        <p className="text-[10px] leading-relaxed text-white/70 font-bold italic relative z-10">
          "{result.zeroLossJustification}"
        </p>
      </motion.div>
      
      {/* Footer Action */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-white to-white/90 text-black font-black uppercase tracking-[0.2em] text-[10px] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2 mt-2"
      >
        <Zap size={12} />
        Execute Trade
      </motion.button>
    </div>
  );
};
