'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ToastContainer } from '@/components/common/Toast'
import { useToastStore } from '@/stores/toastStore'

function ToastWrapper() {
  const { toasts, removeToast } = useToastStore()
  return <ToastContainer toasts={toasts} onClose={removeToast} />
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // 1 minute
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastWrapper />
    </QueryClientProvider>
  )
}
