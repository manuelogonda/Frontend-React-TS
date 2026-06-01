
import { MultiStepForm } from './Components/FormHandling-EventListeners/form';
import { Bio } from './Components/simple-components/Bio'
import { Header } from './Components/simple-components/Header'
import { ProjectCard, type ProjectAttributes } from './Components/simple-components/ProjectCard'
import { ProjectList } from './Components/simple-components/Projects';
import { CounterWithConstraint, Footer, MainContent, Navbar, useTheme } from './Components/StateManagement/UseStateThemeToggler';
import './index.css'

const MOCK_PROJECT_DATABASE: ProjectAttributes[] = [
  {
    id: 201,
    title: "Sacco Core Banking Layer",
    description: "Enterprise multi-tenant transaction accounting engine processing ledger transactions securely.",
    techStack: ["Java 17", "Spring Boot", "PostgreSQL", "Docker"],
    isCompleted: true,
    liveUrl: "https://github.com"
  },
  {
    id: 202,
    title: "Agribusiness Supply Chain Hub",
    description: "Distributed logistical tracing application calculating dynamic distribution routes for farm fresh produce.",
    techStack: ["TypeScript", "React", "Tailwind CSS", "Vite"],
    isCompleted: false,
    liveUrl: "https://vercel.com"
  },
  {
    id: 203,
    title: "Fintech Tokenized Auth Gateway",
    description: "Stateless security gateway infrastructure issuing stateless encrypted JSON Web Tokens and blocking XSS injections.",
    techStack: ["Spring Security", "Java", "JWT", "Redis"],
    isCompleted: true,
    liveUrl: "https://github.com"
  },
  {
    id: 204,
    title: "Real Estate Property Micro-SaaS",
    description: "Client-facing listing presentation portal executing lightning-fast cached item querying structures.",
    techStack: ["React 19", "TypeScript", "Context API", "Netlify"],
    isCompleted: false,
    liveUrl: "https://render.com"
  },
  {
    id: 205,
    title: "Daraja M-Pesa Integration Service",
    description: "Automated asynchronous STK Push transaction processor responding directly to Webhook data payloads.",
    techStack: ["Java", "Spring Web", "Daraja API", "JUnit5"],
    isCompleted: true,
    liveUrl: "https://github.com"
  }
];


function AppContent() {
  const { isDark } = useTheme();

  return (
    <div
      className={`
        transition-colors duration-300
        ${isDark ? 'bg-gray-900' : 'bg-white'}
      `}
    >
      <Navbar />
      <MainContent />
      <Footer />
    </div>
  );
}

      // <div className="min-h-screen bg-slate-50/50 py-6 px-4 sm:px-6">
{/* <Header />
      <Bio />
      
      <main className="max-w-2xl mx-auto mt-4 font-sans">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-1">
          Dynamic Repository Output ({MOCK_PROJECT_DATABASE.length} Records Verified)
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {MOCK_PROJECT_DATABASE.map((project) => {
            return (
              <ProjectCard 
                key={project.id} 
                id={project.id}
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                isCompleted={project.isCompleted}
                liveUrl={project.liveUrl}
              />
            );
          })}
          
        </div>
      </main> */}
     
    // </div>
    {/* <CounterWithConstraint /> */}
    
    // </>

function App() {

  return (
   <>
   <MultiStepForm />
   </>
  )
}

export default App
