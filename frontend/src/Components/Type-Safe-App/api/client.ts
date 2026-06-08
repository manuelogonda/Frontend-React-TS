import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios"
import axios from "axios"

// Typed instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('📤 Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error.message)
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  response => {
    console.log('✅ Response:', response.status, response.config.url)
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)