export interface ProjectAttributes {
  id: number;
  title: string;
  description: string;
  techStack: string[]; 
  isCompleted: boolean;
  liveUrl: string;
}

export function ProjectCard({ title, description, techStack, isCompleted, liveUrl }: ProjectAttributes) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs hover:shadow-md hover:border-slate-200 transition-all font-sans">
      
      <div className="flex items-center justify-between gap-4 mb-2">
        <h3 className="text-base font-bold text-slate-800 tracking-tight">
          {title}
        </h3>
        
        <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-sm border ${
          isCompleted 
            ? "text-emerald-600 bg-emerald-50 border-emerald-200" 
            : "text-amber-600 bg-amber-50 border-amber-200"
        }`}>
          {isCompleted ? "Production Live" : "In Development"}
        </span>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed mb-4">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {techStack.map((tech, index) => (
          <span key={index} className="px-2 py-0.5 text-[10px] font-medium text-slate-600 bg-slate-100 rounded-md">
            {tech}
          </span>
        ))}
      </div>

      <a 
        href={liveUrl} 
        target="_blank" 
        rel="noreferrer" 
        className="inline-flex items-center text-xs font-semibold text-slate-900 hover:text-slate-700 transition-colors"
      >
        Explore Repository Matrix &rarr;
      </a>

    </div>
  );
}