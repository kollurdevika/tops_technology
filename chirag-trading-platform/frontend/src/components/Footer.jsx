'use client';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/admin') return null;

  return (
    <footer className="border-t border-white/10 bg-background pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-bold text-glow tracking-wider">
              YODHAA<span className="text-neonGreen">TRADERS</span>
            </span>
            <p className="text-gray-500 mt-2 text-sm">Elevating your trading journey.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">About</a>
            <a href="#services" className="text-gray-400 hover:text-white transition-colors text-sm">Services</a>
            <a href="#social" className="text-gray-400 hover:text-white transition-colors text-sm">Community</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a>
          </div>
                 </div>
        
        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Chirag Adaki. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
