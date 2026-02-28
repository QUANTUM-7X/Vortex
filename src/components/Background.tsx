import { motion } from "motion/react";

export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#010102]">
      {/* Cosmic Nebula Animation */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 20, repeat: 999999999, ease: "linear" }}
          className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_30%_30%,#8B5CF620_0%,transparent_50%)]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 25, repeat: 999999999, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_70%_70%,#06B6D420_0%,transparent_50%)]" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: 999999999, ease: "linear" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#EC489910_0%,transparent_70%)]" 
        />
      </div>

      {/* Ultra-Fine Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Moving Data Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ 
              duration: 10 + i * 5, 
              repeat: 999999999, 
              ease: "linear",
              delay: i * 2
            }}
            className="absolute h-[1px] w-1/2 bg-gradient-to-r from-transparent via-vortex-cyan/20 to-transparent"
            style={{ top: `${20 + i * 15}%` }}
          />
        ))}
      </div>

      {/* Quantum Noise Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
