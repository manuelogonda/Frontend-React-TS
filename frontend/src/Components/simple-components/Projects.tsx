export function ProjectList() {
  return (
    <section className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-xl shadow-sm border border-slate-100 font-sans">
      
      <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-4 border-b border-slate-100 pb-2">
        Active Core Projects
      </h2>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-lg">
        <img 
          src="https://picsum.photos" 
          alt="Developer Workspace Graphic" 
          className="w-20 h-20 object-cover rounded-lg border border-slate-200 shadow-inner"
        />
        <ul className="flex-1 space-y-3 text-sm text-slate-600">
          <li className="leading-relaxed">
            <strong className="text-slate-900 font-semibold block sm:inline">
              Enterprise Spring Boot Server:
            </strong>
            Rest APIs, JWT Security infrastructure, OAuth2.0 authentication architecture.
          </li>
          <li className="leading-relaxed">
            <strong className="text-slate-900 font-semibold block sm:inline">
              Interactive Client Interface:
            </strong>
            Deployed declarative React layout layer optimized via memory blueprints.
          </li>
        </ul>
        
      </div>
    </section>
  );
}