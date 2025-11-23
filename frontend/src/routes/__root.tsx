import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    component: () => (
        <>
            {/* Menu Fixo ou apenas o container principal */}
            <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
                <Outlet />
            </div>

            {/* Ferramenta de debug (só aparece em desenvolvimento) */}
            <TanStackRouterDevtools />
        </>
    ),
})