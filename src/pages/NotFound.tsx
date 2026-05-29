import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen bg-black text-white">
    <main className="pt-40 pb-32 px-6 text-center">
      <div className="max-w-xl mx-auto glass rounded-[2rem] p-12">
        <p className="text-[10rem] font-light leading-none text-gradient">404</p>
        <h1 className="text-3xl text-white font-light mt-2 mb-3">Lost in the glass</h1>
        <p className="text-white/50 mb-8">The page you're looking for doesn't exist on Shro.</p>
        <Link to="/" className="glass-strong px-6 py-3 rounded-full text-sm font-medium text-white hover:bg-white hover:text-black transition-all inline-block">
          Back home
        </Link>
      </div>
    </main>
  </div>
);

export default NotFound;
