'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === '/admin') return null;

  return (
    <nav className="fixed w-full z-50 glass-panel border-b-0 border-neonGreen/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <img src="/logo.jpg.png" alt="Yodhaa Traders" className="h-12 w-auto object-contain" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="#about" className="hover:text-neonGreen transition-colors px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link href="#services" className="hover:text-neonGreen transition-colors px-3 py-2 rounded-md text-sm font-medium">Services</Link>
              <Link href="#social" className="hover:text-neonGreen transition-colors px-3 py-2 rounded-md text-sm font-medium">Community</Link>
              <Link href="#contact" className="hover:text-neonGreen transition-colors px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-panel"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link href="#services" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</Link>
            <Link href="#social" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Community</Link>
            <Link href="#contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
