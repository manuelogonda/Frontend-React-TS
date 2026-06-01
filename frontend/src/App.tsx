
import { MultiStepForm, RegistrationMainForm } from './Components/FormHandling-EventListeners/form';
import { Bio } from './Components/simple-components/Bio'
import { Header } from './Components/simple-components/Header'
import { ProjectCard, type ProjectAttributes } from './Components/simple-components/ProjectCard'
import { ProjectList } from './Components/simple-components/Projects';
import { ClockDashboard } from './Components/StateManagement/SideEffects';
import { CounterWithConstraint, Footer, MainContent, Navbar, ThemeProvider, useTheme } from './Components/StateManagement/UseStateThemeToggler';
import './index.css'

// const MOCK_PROJECT_DATABASE: ProjectAttributes[] = [
//   {
//     id: 201,
//     title: "Sacco Core Banking Layer",
//     description: "Enterprise multi-tenant transaction accounting engine processing ledger transactions securely.",
//     techStack: ["Java 17", "Spring Boot", "PostgreSQL", "Docker"],
//     isCompleted: true,
//     liveUrl: "https://github.com"
//   },
//   {
//     id: 202,
//     title: "Agribusiness Supply Chain Hub",
//     description: "Distributed logistical tracing application calculating dynamic distribution routes for farm fresh produce.",
//     techStack: ["TypeScript", "React", "Tailwind CSS", "Vite"],
//     isCompleted: false,
//     liveUrl: "https://vercel.com"
//   },
//   {
//     id: 203,
//     title: "Fintech Tokenized Auth Gateway",
//     description: "Stateless security gateway infrastructure issuing stateless encrypted JSON Web Tokens and blocking XSS injections.",
//     techStack: ["Spring Security", "Java", "JWT", "Redis"],
//     isCompleted: true,
//     liveUrl: "https://github.com"
//   },
//   {
//     id: 204,
//     title: "Real Estate Property Micro-SaaS",
//     description: "Client-facing listing presentation portal executing lightning-fast cached item querying structures.",
//     techStack: ["React 19", "TypeScript", "Context API", "Netlify"],
//     isCompleted: false,
//     liveUrl: "https://render.com"
//   },
//   {
//     id: 205,
//     title: "Daraja M-Pesa Integration Service",
//     description: "Automated asynchronous STK Push transaction processor responding directly to Webhook data payloads.",
//     techStack: ["Java", "Spring Web", "Daraja API", "JUnit5"],
//     isCompleted: true,
//     liveUrl: "https://github.com"
//   }
// ];


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
      <ClockDashboard />
      <main>
        <RegistrationMainForm />
      </main>
      <Footer />
    </div>
  );
}

function App() {

  return (
   <ThemeProvider>
    <AppContent />
   </ThemeProvider>
  )
}

export default App
