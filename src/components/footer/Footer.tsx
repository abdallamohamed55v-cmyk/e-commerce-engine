import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="px-6 py-12 border-t border-white/5 bg-[#050505]">
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <Link to="/" className="text-lg font-bold tracking-tighter text-white">
          SHRO<span className="text-zinc-500">.</span>
        </Link>
        <p className="text-xs text-zinc-500 leading-relaxed mt-4 max-w-sm">
          The marketplace for premium AI courses. Taught by practitioners.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-12">
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-4">Courses</h4>
          <ul className="space-y-3 text-sm text-zinc-500">
            <li><Link to="/" className="hover:text-white transition-colors">All courses</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">ChatGPT</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">AI Agents</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">LLM Dev</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-zinc-500">
            <li><Link to="/about/our-story" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/about/customer-care" className="hover:text-white transition-colors">Support</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-4">Legal</h4>
          <ul className="space-y-3 text-sm text-zinc-500">
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms</Link></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-8 border-t border-white/5">
        <div className="text-[10px] text-zinc-600 tracking-wider">© {new Date().getFullYear()} SHRO. ALL RIGHTS RESERVED.</div>
        <div className="text-[10px] text-zinc-400 tracking-wider">LEARN AI. SHIP FASTER.</div>
        <div className="text-[10px] text-zinc-500 tracking-wider mt-2">
          POWERED BY{" "}
          <a
            href="https://megsyai.com"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-300 hover:text-white underline underline-offset-2"
          >
            MEGSYAI.COM
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
