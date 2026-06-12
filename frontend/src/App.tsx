
// import { Outlet } from 'react-router-dom';
// import { Navigation } from './Components/Routing/DynamicRoutes';
// import { MultiStepForm, RegistrationMainForm } from './Components/FormHandling-EventListeners/form';
// import { Bio } from './Components/simple-components/Bio'
// import { Header } from './Components/simple-components/Header'
// import { ProjectCard, type ProjectAttributes } from './Components/simple-components/ProjectCard'
// import { ProjectList } from './Components/simple-components/Projects';
// import { ClockDashboard } from './Components/StateManagement/SideEffects';
// import { CounterWithConstraint, Footer, MainContent, Navbar, ThemeProvider, useTheme } from './Components/StateManagement/UseStateThemeToggler';
import { UserDashboard } from './Components/AuthContext/UserDashboard';
import { AuthProvider } from './Components/context/AuthContext';
import { VideoPlayer } from './Components/context/useRefDemo';
import { CheckoutForm } from './Components/FormHandling-EventListeners/CheckoutForm';
import './index.css'
// import type { Product } from './Components/Type-Safe-App/types';
// import { useTheme } from './Components/Type-Safe-App/Hooks/useTheme';
import React from 'react';
// import { cn } from './Components/Type-Safe-App/utils/cn';
// import { ProductCard } from './Components/Type-Safe-App/components/ProductCard';
// import { PostDashBoard } from './Components/AxiosRestAPI/Post';
// import { UserDashboard } from './Components/AxiosRestAPI/SearchFilterDashboard';

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


// function AppContent() {
  // const { isDark } = useTheme();

  // return (
  //   <div
  //     className={`
  //       transition-colors duration-300
  //       ${isDark ? 'bg-gray-900' : 'bg-white'}
  //     `}
  //   >
  //     <Navbar />
  //     <ClockDashboard />
  //     <main>
  //       <RegistrationMainForm />
  //     </main>
  //     <Footer />
  //   </div>
  // );
// }
// const SAMPLE_PRODUCTS: Product[] = [
//   {
//     id: 1,
//     name: 'Nyama Choma Plate',
//     price: 450,
//     category: 'Main Dishes',
//     icon: '🍖',
//     description: 'Grilled meat served with ugali and sukuma wiki',
//     details: 'Our signature nyama choma is marinated in our secret spice blend.',
//     rating: 4.8,
//     reviews: 124,
//     inStock: true,
//     relatedProducts: [2, 3]
//   },
//   {
//     id: 2,
//     name: 'Ugali & Sukuma Wiki',
//     price: 200,
//     category: 'Main Dishes',
//     icon: '🌾',
//     description: 'Traditional maize meal with sautéed greens',
//     details: 'Classic Kenyan dish made with fresh corn meal.',
//     rating: 4.5,
//     reviews: 87,
//     inStock: true,
//     relatedProducts: [1, 3]
//   },
//   {
//     id: 3,
//     name: 'Chapati & Beans',
//     price: 250,
//     category: 'Main Dishes',
//     icon: '🫓',
//     description: 'Soft flatbread with spiced beans',
//     details: 'Hand-rolled chapati served with hearty bean stew.',
//     rating: 4.6,
//     reviews: 95,
//     inStock: true,
//     relatedProducts: [1, 2]
//   }
// ]



function App() {
  // const { isDark } = useTheme();

  return (
    // //  <div className={`
    // //   transition-colors duration-300 min-h-screen flex flex-col
    // //   ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    // // `}>
    //   {/* <Navigation />
      
    //   {/* Child routes render here */}
    //   /* <main className="flex-1">*
    //     <Outlet />
    //   </main>
    //   <Footer /> */} 
    //   {/* <PostDashBoard /> */}
    //   {/* <UserDashboard /> */}
    // // </div>
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <main className="p-6">
          <UserDashboard />
          <CheckoutForm />
          <VideoPlayer />
        </main>
      </div>
    </AuthProvider>
  )
}

// const App: React.FC = () => {
//   const { isDark, toggleTheme } = useTheme()
//   const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null)

//   const handleProductClick = (product: Product): void => {
//     setSelectedProduct(product)
//   }

//   const handleCloseDetail = (): void => {
//     setSelectedProduct(null)
//   }

//   return (
//     <div className={cn(
//       'transition-colors duration-300 min-h-screen',
//       isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
//     )}>
//       {/* Header */}
//       <header className={cn(
//         'border-b transition-colors',
//         isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
//       )}>
//         <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
//           <h1 className="text-3xl font-bold">🍽️ ManuEats</h1>
//           <button
//             onClick={toggleTheme}
//             className={cn(
//               'px-4 py-2 rounded-lg font-medium transition-all',
//               isDark
//                 ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
//                 : 'bg-gray-800 text-white hover:bg-gray-700'
//             )}
//           >
//             {isDark ? '☀️' : '🌙'}
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-12">
//         <h2 className="text-4xl font-bold mb-12 text-center">Featured Products</h2>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {SAMPLE_PRODUCTS.map(product => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               isDark={isDark}
//               onClick={() => handleProductClick(product)}
//             />
//           ))}
//         </div>
//       </main>

//       {/* Product Detail Modal */}
//       {selectedProduct && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={handleCloseDetail}
//         >
//           <div
//             className={cn(
//               'p-8 rounded-lg max-w-md w-full',
//               isDark ? 'bg-gray-800' : 'bg-white'
//             )}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="text-6xl mb-4 text-center">
//               {selectedProduct.icon}
//             </div>
//             <h3 className="text-2xl font-bold mb-4">
//               {selectedProduct.name}
//             </h3>
//             <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
//               {selectedProduct.details}
//             </p>
//             <p className="text-2xl font-bold my-4">
//               KES {selectedProduct.price}
//             </p>
//             <button
//               onClick={handleCloseDetail}
//               className={cn(
//                 'w-full py-2 rounded-lg font-bold transition-all',
//                 isDark
//                   ? 'bg-blue-600 hover:bg-blue-700'
//                   : 'bg-blue-500 hover:bg-blue-600',
//                 'text-white'
//               )}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

export default App
