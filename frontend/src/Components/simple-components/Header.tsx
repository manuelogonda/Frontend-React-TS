export function Header() {
  const devProfile = "Frontend Developer Profile";
  const currentStatus = "Available for junior roles";

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 max-w-2xl mx-auto mt-8 p-6 bg-slate-900 rounded-xl shadow-md text-white font-sans">
      
      <h1 className="text-xl font-bold tracking-tight text-slate-100">
        {devProfile}
      </h1>
      <p className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        {currentStatus}
      </p>
      
    </header>
  );
}