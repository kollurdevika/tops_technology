'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartLine, FaBrain, FaShieldAlt, FaCommentsDollar, FaTimes } from 'react-icons/fa';

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/services');
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch services', err);
      }
    };
    fetchServices();
  }, []);

  const getIcon = (iconName) => {
    const iconClass = "text-3xl text-neonGreen mb-4";
    switch (iconName) {
      case 'FaBrain': return <FaBrain className={iconClass} />;
      case 'FaShieldAlt': return <FaShieldAlt className={iconClass} />;
      case 'FaCommentsDollar': return <FaCommentsDollar className={iconClass} />;
      case 'FaChartLine':
      default:
        return <FaChartLine className={iconClass} />;
    }
  };

  return (
    <section id="services" className="py-24 relative z-10 bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow">Trading Services</h2>
          <div className="h-1 w-20 bg-neonGreen mx-auto rounded-full"></div>
        </div>

        {services.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>Loading services...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((svc) => (
              <motion.div 
                key={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-panel p-8 rounded-2xl glass-panel-hover flex flex-col h-full"
              >
                <div>
                  {getIcon(svc.icon)}
                  <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{svc.description}</p>
                </div>
                <div className="mt-auto pt-4">
                  <button 
                    onClick={() => setSelectedService(svc)}
                    className="text-neonGreen text-sm font-semibold hover:text-white transition-colors flex items-center"
                  >
                    Learn More <span className="ml-2">&rarr;</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Service Details */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel border border-neonGreen/30 w-full max-w-2xl p-8 rounded-2xl relative shadow-[0_0_40px_rgba(185,246,65,0.15)]"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>
              
              <div className="mb-6 flex items-center gap-4">
                {getIcon(selectedService.icon)}
                <div>
                  <h3 className="text-3xl font-bold text-white text-glow">{selectedService.title}</h3>
                  <div className="h-0.5 w-16 bg-neonGreen rounded-full mt-2"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-lg text-neonGreen/90 font-medium">
                  {selectedService.description}
                </p>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedService.details}
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <a 
                  href="#contact" 
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-3 rounded-lg bg-neonGreen text-black font-bold hover:shadow-[0_0_15px_rgba(185,246,65,0.6)] transition-all flex items-center gap-2"
                >
                  Inquire Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
