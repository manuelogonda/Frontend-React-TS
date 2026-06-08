import type { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { apiClient } from "../api/client"

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiOptions {
  retry?: number
  delay?: number
}

export function useApi<T>(
  url: string,
  options: UseApiOptions = {}
): UseApiState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null
  })

  const fetchData = async (attemptCount: number = 0): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const { data } = await apiClient.get<T>(url)
      setState({ data, loading: false, error: null })
    } catch (err) {
      const error = err as AxiosError

      if (attemptCount < (options.retry ?? 0)) {
        await new Promise(resolve =>
          setTimeout(resolve, options.delay ?? 1000)
        )
        return fetchData(attemptCount + 1)
      }

      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to fetch'
      }))
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return {
    ...state,
    refetch: () => fetchData()
  }
}