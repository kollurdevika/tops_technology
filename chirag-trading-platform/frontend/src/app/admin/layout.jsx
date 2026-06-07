export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#050508] text-white pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h1 className="text-2xl font-bold text-neonBlue">Admin Dashboard</h1>
            <a href="/" className="text-sm text-gray-400 hover:text-white">Back to Site</a>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
