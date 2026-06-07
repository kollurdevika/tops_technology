import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Chirag Adaki - Professional Trader',
  description: 'Personal portfolio and trading community platform of Chirag Adaki.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col relative z-0">
        {/* Premium Global Background */}
        <div className="fixed inset-0 z-[-2] bg-radial-glows pointer-events-none"></div>
        <div className="fixed inset-0 z-[-1] bg-grid-pattern pointer-events-none"></div>
        
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
