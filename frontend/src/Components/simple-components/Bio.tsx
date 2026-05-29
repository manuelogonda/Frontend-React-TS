export function Bio() {
  const bioHeading = "About Me";
  
  return (
    <section className="max-w-2xl mx-auto my-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100 font-sans">
      
      <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-3 border-b border-slate-100 pb-2">
        {bioHeading}
      </h2>
      
      <p className="text-sm leading-relaxed text-slate-600 mb-5">
        Backend and frontend software developer currently learning full-stack execution models. 
        Transitioning standard programming habits away from slow, manual, imperative DOM selections 
        and moving cleanly into optimized, declarative React memory nodes.
      </p>
      <div className="space-y-2">
        <label 
          htmlFor="user-message" 
          className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Send a Connection Request
        </label>
        
        <div className="flex gap-2">
          <input 
            id="user-message" 
            type="text" 
            placeholder="Type your message here..." 
            className="flex-1 px-4 py-2 text-sm text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
          
          <button 
            type="button" 
            className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Connect
          </button>
        </div>
      </div>

    </section>
  );
}