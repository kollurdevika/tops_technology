'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaTelegramPlane, FaWhatsapp, FaLink } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import axios from 'axios';

export default function SocialLinks() {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    setSocials([
      { platform: "Instagram", username: "@Yodhha.Treader", followers: "Join", url: "https://www.instagram.com/the_yoddha_trader?igsh=MTV0Y3c5dGR2YWt2Yg==", iconName: "FaInstagram" },
      { platform: "YouTube", username: "Yodhha Trading", followers: "Join", url: "https://youtube.com/@yoddhatrader1401?si=9QMWk7ivrubbjR3B", iconName: "FaYoutube" },
      { platform: "Telegram", username: "Yodhha Signals", followers: "Join", url: "https://t.me/adkeducation", iconName: "FaTelegramPlane" },
      { platform: "WhatsApp", username: "Trading Community", followers: "Join", url: "https://chat.whatsapp.com/Lodp6uEDoC8FQJEhBTm1zm", iconName: "FaWhatsapp" },
    ]);
  }, []);

  const getIcon = (name) => {
    switch (name) {
      case 'FaInstagram': return <FaInstagram />;
      case 'FaYoutube': return <FaYoutube />;
      case 'FaTelegramPlane': return <FaTelegramPlane />;
      case 'FaWhatsapp': return <FaWhatsapp />;
      case 'FaXTwitter': return <FaXTwitter />;
      default: return <FaLink />;
    }
  };

  const getColor = (name) => {
    switch (name) {
      case 'FaInstagram': return "hover:shadow-[0_0_20px_#E1306C]";
      case 'FaYoutube': return "hover:shadow-[0_0_20px_#FF0000]";
      case 'FaTelegramPlane': return "hover:shadow-[0_0_20px_#0088cc]";
      case 'FaWhatsapp': return "hover:shadow-[0_0_20px_#25D366]";
      case 'FaXTwitter': return "hover:shadow-[0_0_20px_#ffffff]";
      default: return "hover:shadow-[0_0_20px_#B9F641]";
    }
  };

  return (
    <section id="social" className="py-24 relative z-10 bg-background/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow">Join The Community</h2>
          <div className="h-1 w-20 bg-neonGreen mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">Connect with me across platforms to get daily insights, market analysis, and live updates.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {socials.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.url}
              target="_blank" rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`glass-panel p-6 rounded-2xl flex flex-col items-center justify-center w-48 h-48 transition-all ${getColor(social.icon || social.iconName)} border border-neonGreen`}
            >
              <div className="text-5xl mb-4 text-white">{getIcon(social.icon || social.iconName)}</div>
              <h3 className="text-lg font-bold text-white mb-1">{social.platform}</h3>
              <p className="text-xs text-neonGreen mb-2">{social.username}</p>
              {social.followers && (
                <span className="text-sm font-semibold bg-white/10 px-3 py-1 rounded-full text-gray-300">{social.followers}</span>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
