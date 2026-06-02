import { createBrowserRouter, Form, 
    isRouteErrorResponse, Link, 
    useActionData, useLoaderData, useLocation, 
    useNavigate, useParams, useRouteError, type LoaderFunctionArgs, type RouteObject } from "react-router-dom";
import { useTheme } from "../StateManagement/UseStateThemeToggler";
import { useState, type ReactNode } from "react";
import App from "../../App";



//router.tsx
const routeConfig: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'menu',
                element: <Menu />,
            },
            {
                path: 'products',
                element: <Products />
            },
            {
                //dynamic routes
                path: 'product/:productId',
                element: <ProductDetails />,
                loader: productDetailsLoader,
                action: ProductDetails
            },
            {
                path: 'contact',
                element: <Contact />,
                loader: contactLoader,
                action: contactAction
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    }
]

export const routes = createBrowserRouter(routeConfig);


//product data and types
export interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  details: string
  rating: number
  reviews: number
  inStock: boolean
  relatedProducts: string[]
}
//mock products db

export const PRODUCTS_DB: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Nyama Choma Plate',
    price: 450,
    category: 'Main Dishes',
    description: 'Grilled meat served with ugali and sukuma wiki',
    details: 'Our signature nyama choma is marinated in our secret spice blend and grilled to perfection. Served with traditional sides.',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    relatedProducts: ['2', '3', '4']
  },
  '2': {
    id: '2',
    name: 'Ugali & Sukuma Wiki',
    price: 200,
    category: 'Main Dishes',
    description: 'Traditional maize meal with sautéed greens',
    details: 'Classic Kenyan dish made with fresh corn meal and locally sourced greens.',
    rating: 4.5,
    reviews: 87,
    inStock: true,
    relatedProducts: ['1', '3', '5']
  },
  '3': {
    id: '3',
    name: 'Chapati & Beans',
    price: 250,
    category: 'Main Dishes',
    description: 'Soft flatbread with spiced beans',
    details: 'Hand-rolled chapati served with hearty bean stew.',
    rating: 4.6,
    reviews: 95,
    inStock: true,
    relatedProducts: ['1', '2', '4']
  },
  '4': {
    id: '4',
    name: 'Grilled Fish',
    price: 500,
    category: 'Main Dishes',
    description: 'Fresh tilapia grilled with lemon and herbs',
    details: 'Fresh whole tilapia from Lake Victoria, grilled and served with rice and vegetables.',
    rating: 4.9,
    reviews: 156,
    inStock: true,
    relatedProducts: ['1', '3', '5']
  },
  '5': {
    id: '5',
    name: 'Fresh Juice',
    price: 150,
    category: 'Beverages',
    description: 'Fresh squeezed orange, mango, or passion fruit juice',
    details: 'Made fresh daily from locally sourced fruits. Choose your favorite!',
    rating: 4.4,
    reviews: 67,
    inStock: true,
    relatedProducts: ['6', '7', '8']
  },
  '6': {
    id: '6',
    name: 'Iced Tea',
    price: 120,
    category: 'Beverages',
    description: 'Cold brewed tea with fresh lemon',
    details: 'Refreshing iced tea perfect for hot Nairobi days.',
    rating: 4.3,
    reviews: 54,
    inStock: true,
    relatedProducts: ['5', '7', '8']
  },
  '7': {
    id: '7',
    name: 'Soft Drink',
    price: 100,
    category: 'Beverages',
    description: 'Refreshing carbonated beverage',
    details: 'Cold and refreshing soft drinks in various flavors.',
    rating: 4.1,
    reviews: 42,
    inStock: true,
    relatedProducts: ['5', '6', '8']
  },
  '8': {
    id: '8',
    name: 'Coffee',
    price: 200,
    category: 'Beverages',
    description: 'Freshly brewed Kenyan coffee',
    details: 'Single-origin Kenyan coffee roasted and brewed fresh.',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    relatedProducts: ['5', '6', '7']
  }
}

//products listing
// Loader: Fetch all products
export async function productsLoader() {
  // In real app, this would be: await fetch('/api/products')
  // For now, return from local database
  return Object.values(PRODUCTS_DB)
}

export function Products() {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const products = useLoaderData() as Product[]

  // Group by category
  const grouped = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = []
    acc[product.category].push(product)
    return acc
  }, {} as Record<string, Product[]>)

  const handleProductClick = (productId: string) => {
    // Programmatic navigation to product detail page
    navigate(`/product/${productId}`)
  }

  return (
    <div className={`
      transition-colors duration-300 min-h-[calc(100vh-180px)] py-20 px-4
      ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    `}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Our Menu</h1>

        <div className="space-y-16">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                {category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className={`
                      p-6 rounded-lg transition-all cursor-pointer transform hover:scale-105
                      ${isDark
                        ? 'bg-gray-800 hover:bg-gray-700'
                        : 'bg-gray-50 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="text-5xl mb-3 text-center">{product.icon}</div>

                    <h3 className="font-bold mb-2 text-lg">{product.name}</h3>

                    <p className={`
                      text-sm mb-4 h-10
                      ${isDark ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <p className={`
                        text-lg font-bold
                        ${isDark ? 'text-blue-400' : 'text-blue-600'}
                      `}>
                        KES {product.price}
                      </p>

                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>

                    <button className={`
                      w-full py-2 rounded-lg font-medium transition-all
                      ${isDark
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                      }
                    `}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

//products details page
// Loader: Fetch specific product
export async function productDetailsLoader({ params }: LoaderFunctionArgs) {
  const productId = params.productId

  if (!productId) {
    throw new Error('Product ID is required')
  }

  // In real app: await fetch(`/api/products/${productId}`)
  const product = PRODUCTS_DB[productId]

  if (!product) {
    throw new Error(`Product ${productId} not found`)
  }

  return product
}

export function ProductDetails() {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const product = useLoaderData() as Product
  const { productId } = useParams<{ productId: string }>()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  // Get related products
  const relatedProducts = product.relatedProducts
    .map(id => PRODUCTS_DB[id])
    .filter(Boolean)

  const handleAddToCart = () => {
    console.log(`Added ${quantity}x ${product.name} to cart`)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleNavigateProduct = (newProductId: string) => {
    // Navigate to different product (URL changes, loader runs again)
    navigate(`/product/${newProductId}`)
  }

  return (
    <div className={`
      transition-colors duration-300 min-h-[calc(100vh-180px)] py-12 px-4
      ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    `}>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`
            mb-8 px-4 py-2 rounded-lg font-medium transition-all
            ${isDark
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }
          `}
        >
          ← Back
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Product Image & Details */}
          <div className="lg:col-span-2">
            {/* Image */}
            

            {/* Title & Rating */}
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-400'}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price & Stock */}
            <div className="mb-8 pb-8 border-b border-gray-700">
              <p className={`
                text-4xl font-bold mb-4
                ${isDark ? 'text-blue-400' : 'text-blue-600'}
              `}>
                KES {product.price}
              </p>

              <div className="flex items-center gap-4">
                <span className={`
                  px-4 py-2 rounded-lg font-bold
                  ${product.inStock
                    ? isDark
                      ? 'bg-green-900/30 text-green-400'
                      : 'bg-green-100 text-green-700'
                    : isDark
                    ? 'bg-red-900/30 text-red-400'
                    : 'bg-red-100 text-red-700'
                  }
                `}>
                  {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">About This Item</h2>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                {product.details}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <label className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  Quantity:
                </label>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`
                      px-4 py-2
                      ${isDark ? 'bg-gray-700' : 'bg-gray-200'}
                    `}
                  >
                    −
                  </button>
                  <span className="px-6 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`
                      px-4 py-2
                      ${isDark ? 'bg-gray-700' : 'bg-gray-200'}
                    `}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`
                  px-8 py-3 rounded-lg font-bold transition-all
                  ${product.inStock
                    ? isDark
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'opacity-50 cursor-not-allowed'
                  }
                `}
              >
                {added ? '✅ Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Product Info Card */}
            <div className={`
              p-6 rounded-lg mb-8
              ${isDark ? 'bg-gray-800' : 'bg-gray-50'}
            `}>
              <h3 className="font-bold mb-4">Product Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Category:
                  </span>
                  <p className="font-semibold">{product.category}</p>
                </div>
                <div>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Product ID:
                  </span>
                  <p className="font-mono text-xs">{product.id}</p>
                </div>
                <div>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Reviews:
                  </span>
                  <p className="font-semibold">{product.reviews}</p>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className={`
                p-6 rounded-lg
                ${isDark ? 'bg-gray-800' : 'bg-gray-50'}
              `}>
                <h3 className="font-bold mb-4">Similar Products</h3>

                <div className="space-y-3">
                  {relatedProducts.map(relatedProduct => (
                    <button
                      key={relatedProduct.id}
                      onClick={() => handleNavigateProduct(relatedProduct.id)}
                      className={`
                        w-full p-3 rounded-lg text-left transition-all
                        ${isDark
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-white hover:bg-gray-100 border'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-semibold text-sm">{relatedProduct.name}</p>
                          <p className={`
                            text-xs
                            ${isDark ? 'text-gray-400' : 'text-gray-600'}
                          `}>
                            KES {relatedProduct.price}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map(related => (
                <div
                  key={related.id}
                  onClick={() => handleNavigateProduct(related.id)}
                  className={`
                    p-6 rounded-lg transition-all cursor-pointer transform hover:scale-105
                    ${isDark
                      ? 'bg-gray-800 hover:bg-gray-700'
                      : 'bg-gray-50 hover:bg-gray-100'
                    }
                  `}
                >
                  <h3 className="font-bold mb-2">{related.name}</h3>
                  <p className={`
                    text-lg font-bold
                    ${isDark ? 'text-blue-400' : 'text-blue-600'}
                  `}>
                    KES {related.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

//footer
export function Footer() {
  const { isDark } = useTheme()

  return (
    <footer className={`
      transition-colors duration-300 mt-20
      ${isDark
        ? 'bg-gray-900 text-gray-400 border-gray-700'
        : 'bg-gray-100 text-gray-600 border-gray-200'
      }
      border-t
    `}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ManuEats
            </h3>
            <p className="text-sm">
              The best food ordering experience in Kenya.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-blue-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-blue-500 transition">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-500 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Privacy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Terms</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Follow
            </h4>
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-blue-500 transition">Twitter</a>
              <a href="#" className="hover:text-blue-500 transition">Facebook</a>
              <a href="#" className="hover:text-blue-500 transition">Instagram</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`
          text-center text-sm pt-8
          ${isDark ? 'border-gray-700' : 'border-gray-300'}
          border-t
        `}>
          <p>&copy; All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

//not found page
export function NotFound() {
  const { isDark } = useTheme()

  return (
    <div className={`
      transition-colors duration-300 min-h-[calc(100vh-180px)]
      flex items-center justify-center px-4
      ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    `}>
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className={`
          text-2xl mb-8
          ${isDark ? 'text-gray-300' : 'text-gray-600'}
        `}>
          Page Not Found
        </p>
        <p className={`
          mb-8
          ${isDark ? 'text-gray-400' : 'text-gray-500'}
        `}>
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className={`
            inline-block px-8 py-3 rounded-lg font-bold transition-all
            ${isDark
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }
          `}
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

//Error boundary
export function ErrorBoundary() {
  const { isDark } = useTheme()
  const error = useRouteError()

  let errorMessage: string
  let errorStatus: number | string = '❌'

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status
    errorMessage = error.statusText || 'An error occurred'
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else {
    errorMessage = 'An unexpected error occurred'
  }

  return (
    <div className={`
      transition-colors duration-300 min-h-screen
      flex items-center justify-center px-4
      ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    `}>
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4">{errorStatus}</h1>
        <p className={`
          text-2xl mb-8
          ${isDark ? 'text-gray-300' : 'text-gray-600'}
        `}>
          Oops! Something went wrong
        </p>
        <p className={`
          mb-8
          ${isDark ? 'text-gray-400' : 'text-gray-500'}
        `}>
          {errorMessage}
        </p>
        <Link
          to="/"
          className={`
            inline-block px-8 py-3 rounded-lg font-bold transition-all
            ${isDark
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }
          `}
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

//contact page loader and action
interface ContactInfo {
  email: string
  phone: string
  address: string
}

interface ActionData {
  success?: boolean
  error?: string
}

// Load contact info before rendering
export async function contactLoader() {
  try {
    const res = await fetch('/api/contact-info')

    if (!res.ok) {
      throw new Error('Failed to load contact information')
    }

    const data = await res.json()
    return data as ContactInfo
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Could not load contact info'
    )
  }
}

// Handle form submission
export async function contactAction({ request }: { request: Request }) {
  if (request.method !== 'POST') {
    return null
  }

  const formData = await request.formData()
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  // Validate
  if (!name || !email || !subject || !message) {
    return { error: 'All fields are required' } as ActionData
  }

  try {
    // Send to server
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    })

    if (!res.ok) {
      throw new Error('Failed to send message')
    }

    console.log('Message sent successfully')
    return { success: true } as ActionData
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ActionData
  }
}

export function Contact() {
  const { isDark } = useTheme()
  const contactInfo = useLoaderData() as ContactInfo
  const actionData = useActionData() as ActionData | undefined

  return (
    <div className={`
      transition-colors duration-300 min-h-[calc(100vh-180px)] py-20 px-4
      ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    `}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Get In Touch</h1>
        <p className={`
          text-center mb-12
          ${isDark ? 'text-gray-300' : 'text-gray-600'}
        `}>
          Have questions? We'd love to hear from you!
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: '📍', title: 'Address', value: contactInfo.address },
            { icon: '📱', title: 'Phone', value: contactInfo.phone },
            { icon: '✉️', title: 'Email', value: contactInfo.email }
          ].map((item, i) => (
            <div
              key={i}
              className={`
                p-6 rounded-lg text-center
                ${isDark ? 'bg-gray-800' : 'bg-gray-50'}
              `}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="font-bold mb-1">{item.title}</p>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Form */}
        <Form method="post" className={`
          p-8 rounded-lg
          ${isDark ? 'bg-gray-800' : 'bg-gray-50'}
        `}>
          {/* Success Message */}
          {actionData?.success && (
            <div className={`
              mb-6 p-4 rounded-lg
              ${isDark
                ? 'bg-green-900/30 text-green-400'
                : 'bg-green-50 text-green-700'
              }
            `}>
              ✅ Message sent successfully! We'll be in touch soon.
            </div>
          )}

          {/* Error Message */}
          {actionData?.error && (
            <div className={`
              mb-6 p-4 rounded-lg
              ${isDark
                ? 'bg-red-900/30 text-red-400'
                : 'bg-red-50 text-red-700'
              }
            `}>
              ❌ {actionData.error}
            </div>
          )}

          {/* Name */}
          <div className="mb-6">
            <label className={`
              block text-sm font-medium mb-2
              ${isDark ? 'text-gray-300' : 'text-gray-700'}
            `}>
              Name *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className={`
                w-full px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none
                ${isDark
                  ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500'
                  : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                }
              `}
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className={`
              block text-sm font-medium mb-2
              ${isDark ? 'text-gray-300' : 'text-gray-700'}
            `}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className={`
                w-full px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none
                ${isDark
                  ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500'
                  : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                }
              `}
            />
          </div>

          {/* Subject */}
          <div className="mb-6">
            <label className={`
              block text-sm font-medium mb-2
              ${isDark ? 'text-gray-300' : 'text-gray-700'}
            `}>
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              required
              placeholder="Subject"
              className={`
                w-full px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none
                ${isDark
                  ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500'
                  : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                }
              `}
            />
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className={`
              block text-sm font-medium mb-2
              ${isDark ? 'text-gray-300' : 'text-gray-700'}
            `}>
              Message *
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your message..."
              className={`
                w-full px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none
                ${isDark
                  ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500'
                  : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                }
              `}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`
              w-full py-3 rounded-lg font-bold transition-all
              ${isDark
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
              }
            `}
          >
            Send Message
          </button>
        </Form>
      </div>
    </div>
  )
}

//menu page with loader
export interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  icon: string
  description: string
}

// v7 Loader: runs BEFORE component renders
export async function menuLoader() {
  try {
    const res = await fetch('/api/menu')

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: Failed to load menu`)
    }

    const data = await res.json()
    return data as MenuItem[]
  } catch (error) {
    // Throw error → ErrorBoundary will catch it
    throw new Error(
      error instanceof Error ? error.message : 'Failed to load menu'
    )
  }
}

export function Menu() {
  const { isDark } = useTheme()
  
  // Data is ALREADY loaded! No loading state needed
  const menuItems = useLoaderData() as MenuItem[]

  // Group by category
  const grouped = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)

  return (
    <div className={`
      transition-colors duration-300 min-h-[calc(100vh-180px)] py-20 px-4
      ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    `}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Our Menu</h1>

        <div className="space-y-16">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-8">{category}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map(item => (
                  <div
                    key={item.id}
                    className={`
                      p-6 rounded-lg text-center transition-all cursor-pointer
                      ${isDark
                        ? 'bg-gray-800 hover:bg-gray-700'
                        : 'bg-gray-50 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-bold mb-2">{item.name}</h3>
                    <p className={`
                      text-sm mb-4
                      ${isDark ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                      {item.description}
                    </p>
                    <p className={`
                      text-lg font-bold mb-4
                      ${isDark ? 'text-blue-400' : 'text-blue-600'}
                    `}>
                      KES {item.price}
                    </p>
                    <button className={`
                      w-full py-2 rounded-lg font-medium transition-all
                      ${isDark
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                      }
                    `}>
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

//About
export function About() {
  const { isDark } = useTheme()

  return (
    <div className={`
      transition-colors duration-300 min-h-[calc(100vh-180px)] py-20 px-4
      ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    `}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About ManuEats</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              ManuEats started as a simple idea: make quality food delivery fast, 
              affordable, and accessible to everyone in Kenya. Founded in 2024, 
              we've grown to serve thousands of customers across Nairobi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              To revolutionize food ordering by bringing restaurant-quality meals 
              directly to your doorstep, with unmatched speed and affordability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className={`
              space-y-2 list-disc list-inside
              ${isDark ? 'text-gray-300' : 'text-gray-600'}
            `}>
              <li>Quality: Fresh, authentic, delicious food</li>
              <li>Speed: Fast delivery without compromise</li>
              <li>Transparency: No hidden charges</li>
              <li>Community: Supporting local restaurants</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

//home
export function Home() {
  const { isDark } = useTheme()

  return (
    <div className={`
      transition-colors duration-300
      ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    `}>
      {/* Hero */}
      <div className={`
        py-20 px-4 text-center
        ${isDark
          ? 'bg-gradient-to-br from-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 to-indigo-100'
        }
      `}>
        <h1 className="text-5xl font-bold mb-4">Welcome to ManuEats</h1>
        <p className={`
          text-xl mb-8
          ${isDark ? 'text-gray-300' : 'text-gray-600'}
        `}>
          The best restaurant ordering experience in Kenya
        </p>
        <Link
          to="/menu"
          className={`
            inline-block px-8 py-3 rounded-lg font-bold transition-all
            ${isDark
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }
          `}
        >
          Browse Menu
        </Link>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '⚡', title: 'Fast Delivery', desc: 'Get your food in 30 minutes or less' },
            { icon: '🍲', title: 'Quality Food', desc: 'Fresh ingredients, authentic recipes' },
            { icon: '💰', title: 'Great Prices', desc: 'Affordable meals without compromise' }
          ].map((feature, i) => (
            <div
              key={i}
              className={`
                p-8 rounded-lg text-center transition-all
                ${isDark
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-50 hover:bg-gray-100'
                }
              `}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className={`
        py-20 text-center
        ${isDark ? 'bg-gray-800' : 'bg-gray-100'}
      `}>
        <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
        <Link
          to="/menu"
          className={`
            inline-block px-8 py-3 rounded-lg font-bold transition-all
            ${isDark
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }
          `}
        >
          View Our Menu
        </Link>
      </div>
    </div>
  )
}

//navigation
export function Navigation() {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Menu', path: '/menu' },
    { label: 'Contact', path: '/contact' }
  ]

  return (
    <nav className={`
      transition-colors duration-300 sticky top-0 z-50
      ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
      border-b shadow-lg
    `}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className={`
              text-2xl font-bold transition-colors
              ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'}
            `}
          >
            🍽️ ManuEats
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  font-medium transition-all py-2 relative
                  ${isActive(item.path)
                    ? isDark
                      ? 'text-blue-400'
                      : 'text-blue-600'
                    : isDark
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5
                  after:w-full after:transition-all
                  ${isActive(item.path)
                    ? isDark
                      ? 'after:bg-blue-400'
                      : 'after:bg-blue-600'
                    : 'after:bg-transparent'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all
              ${isDark
                ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
                : 'bg-gray-800 text-white hover:bg-gray-700'
              }
            `}
            title="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ml-4 text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}
            title="Toggle mobile menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`
            mt-4 pt-4 border-t space-y-2 md:hidden
            ${isDark ? 'border-gray-700' : 'border-gray-200'}
          `}>
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  block px-4 py-2 rounded-lg transition-all
                  ${isActive(item.path)
                    ? isDark
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-600'
                    : isDark
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

//