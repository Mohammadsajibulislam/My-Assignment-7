export default function Footer() {
  return (
    <footer className="bg-[#244d3f] text-white pt-10 pb-6 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <img src="/logo-xl.png" alt="KeenKeeper" className="h-12 mx-auto mb-3" />
        <p className="text-gray-300 text-sm mb-5 max-w-md mx-auto">
        Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <p className="text-gray-400 text-sm mb-3">Social Links</p>
        <div className="flex justify-center gap-3 mb-6">
          <a href="#" className="hover:opacity-80 transition">
            <img src="/instagram.png" alt="Instagram" className="w-9 h-9 rounded-full" />
          </a>
          <a href="#" className="hover:opacity-80 transition">
            <img src="/facebook.png" alt="Facebook" className="w-9 h-9 rounded-full" />
          </a>
          <a href="#" className="hover:opacity-80 transition">
            <img src="/twitter.png" alt="Twitter" className="w-9 h-9 rounded-full" />
          </a>
        </div>
        <div className="border-t border-green-800 pt-4 flex flex-col md:flex-row justify-between text-xs text-gray-400 gap-2">
          <span>© 2026 KeenKeeper. All rights reserved.</span>
          <div className="flex gap-4 justify-center">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
