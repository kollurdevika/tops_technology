'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');
  const [contactInfo, setContactInfo] = useState({
    phone: '+91 9725749624',
    email: 'adakichirag001@.com',
    location: 'Ahmedabad, Gujarat, India'
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/adminContact')
      .then(res => {
        if (res.data) setContactInfo(res.data);
      })
      .catch(err => console.error("Error fetching settings", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await axios.post('http://localhost:5000/api/contacts', formData);
      setStatus('Message Sent Successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    } catch (err) {
      setStatus('Failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow">Get In Touch</h2>
          <div className="h-1 w-20 bg-neonGreen mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-panel p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-neonGreen text-xl">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href={`tel:${contactInfo.phone}`} className="text-lg text-white font-medium hover:text-neonGreen transition-colors">{contactInfo.phone}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-neonGreen text-xl">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-lg text-white font-medium hover:text-neonGreen transition-colors">{contactInfo.email}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-neonGreen text-xl">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Office</p>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address || contactInfo.location)}`} target="_blank" rel="noreferrer" className="text-lg text-white font-medium hover:text-neonGreen transition-colors">{contactInfo.address || contactInfo.location}</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input 
                    type="text" required
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neonGreen transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input 
                    type="email" required
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neonGreen transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone (Optional)</label>
                <input 
                  type="tel"
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neonGreen transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea 
                  required rows="4"
                  value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neonGreen transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-neonGreen text-black font-bold py-4 rounded-lg hover:shadow-[0_0_20px_rgba(185,246,65,0.6)] transition-all"
              >
                Send Message
              </button>
              
              {status && (
                <p className={`text-center font-medium ${status.includes('Successfully') ? 'text-greenAccent' : 'text-neonGreen'}`}>
                  {status}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
