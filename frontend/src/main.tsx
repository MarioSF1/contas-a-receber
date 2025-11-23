import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// 1. Imports do TanStack
import { RouterProvider, createRouter, createHashHistory } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 2. Import da árvore de rotas gerada AUTOMATICAMENTE pelo plugin
import { routeTree } from './routeTree.gen'

// 3. Configuração do TanStack Query
const queryClient = new QueryClient()

// 4. Configuração do Histórico para Electron (CRUCIAL!)
// Electron prefere hash (#/lancar) em vez de URLs normais (/lancar) para não dar erro de arquivo.
const hashHistory = createHashHistory()

// 5. Criação do Router
const router = createRouter({
  routeTree,
  history: hashHistory
})

// Tipagem para o TypeScript funcionar liso
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Envolvemos o App com o Query (dados) e o Router (navegação) */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)