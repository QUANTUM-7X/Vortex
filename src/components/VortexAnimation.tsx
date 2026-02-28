import { motion } from "motion/react";
import { Zap } from "lucide-react";

export const VortexAnimation = () => {
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
      {/* Outer Rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 15 + i * 5, repeat: 999999999, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-white/[0.03]"
          style={{
            margin: `${i * 15}%`,
            borderStyle: i % 2 === 0 ? 'solid' : 'dashed',
          }}
        />
      ))}

      {/* Core Singularity */}
      <div className="absolute inset-[38%] rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center backdrop-blur-md">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 4, repeat: 999999999 }}
          className="absolute inset-0 bg-vortex-cyan/10 blur-xl rounded-full"
        />
        <Zap size={16} className="text-white/40 relative z-10" />
      </div>

      {/* Orbiting Particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 8 + i * 2, repeat: 999999999, ease: "linear" }}
          className="absolute inset-0"
        >
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-vortex-cyan/40 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
          />
        </motion.div>
      ))}
    </div>
  );
};
