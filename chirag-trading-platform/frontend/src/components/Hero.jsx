'use client';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image moved to global layout */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      </div>
      
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-neonGreen drop-shadow-[0_0_15px_rgba(185,246,65,0.5)]"
        >
        YODDHA TRADER
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-3xl text-gray-100 font-bold mb-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]"
        >
          Professional Trader & Trading Mentor
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-2xl text-lg text-gray-200 font-bold mb-10 drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]"
        >
          Mastering the markets through discipline, analysis, and execution. Join the community to elevate your trading journey.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#social" className="px-8 py-4 rounded-full bg-neonGreen text-black font-bold text-lg hover:shadow-[0_0_20px_rgba(185,246,65,0.6)] transition-shadow">
            Join Community
          </a>
          <a href="#contact" className="px-8 py-4 rounded-full border-2 border-neonGreen text-neonGreen font-bold text-lg hover:bg-neonGreen/10 transition-colors">
            Contact Now
          </a>
        </motion.div>
      </div>

      {/* Decorative Chart Lines (Abstract) */}
      <svg className="absolute bottom-0 w-full h-64 opacity-20 z-0" preserveAspectRatio="none" viewBox="0 0 1440 320">
        <path fill="none" stroke="#B9F641" strokeWidth="2" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,85.3C960,75,1056,117,1152,149.3C1248,181,1344,203,1392,213.3L1440,224"></path>
      </svg>
    </section>
  );
}
