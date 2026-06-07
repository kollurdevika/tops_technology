'use client';
import { motion } from 'framer-motion';

export default function About() {
  const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Students Mentored", value: "200+" },
    { label: "Community Members", value: "10K+" }
  ];

  return (
    <section id="about" className="py-24 relative z-10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow">The Journey</h2>
          <div className="h-1 w-20 bg-neonGreen mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 rounded-2xl flex flex-col xl:flex-row gap-8 items-center text-center xl:text-left"
          >
            <div className="w-48 h-48 xl:w-56 xl:h-56 flex-shrink-0 rounded-full overflow-hidden border-4 border-neonGreen/30 shadow-[0_0_30px_rgba(185,246,65,0.2)]">
              <img src="/profile1.jpeg" alt="Chirag Adaki Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Who is Chirag Adaki?</h3>
              <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                I started my trading journey with a simple goal: to understand the financial markets and build sustainable wealth. Over the years, through rigorous market analysis, disciplined risk management, and countless hours of screen time, I developed strategies that work.
              </p>
              <p className="text-gray-400 leading-relaxed text-sm">
                My mission now is to share this knowledge with aspiring traders. I believe that with the right mindset, anyone can master the markets.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-xl text-center glass-panel-hover">
                <h4 className="text-4xl font-extrabold text-glow-gold mb-2">{stat.value}</h4>
                <p className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
            <div className="glass-panel p-6 rounded-xl text-center glass-panel-hover flex flex-col justify-center items-center">
               <h4 className="text-xl font-bold text-white mb-2">Trading Philosophy</h4>
               <p className="text-xs text-gray-400">Preserve Capital. Wait for the setup. Execute without emotion.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
