
import { Bio } from './Components/simple-components/Bio'
import { Header } from './Components/simple-components/Header'
import { ProjectList } from './Components/simple-components/Projects'
import './index.css'

function App() {

  return (
    <>
      <div className="min-h-screen bg-slate-50/50 py-4 px-4 sm:px-6">
     <Header />
     <Bio />
     <ProjectList />
    </div>
    </>
  )
}

export default App
