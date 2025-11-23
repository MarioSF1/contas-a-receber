import { createFileRoute, Link } from '@tanstack/react-router'
import { LayoutDashboard, PlusCircle, Wallet, Users } from 'lucide-react'

// Define que esta é a rota raiz "/"
export const Route = createFileRoute('/')({
    component: MenuPrincipal,
})

function MenuPrincipal() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-6">
            <h1 className="text-3xl font-bold text-gray-700 mb-8">Contas a Receber</h1>

            <div className="grid grid-cols-1 gap-4 w-64">
                {/* Link aponta para o nome da pasta/arquivo na rota */}
                <Link to="/listar" className="p-4 bg-blue-600 text-white rounded-lg flex items-center gap-3 hover:bg-blue-700 transition shadow-lg">
                    <LayoutDashboard /> Listar Dívidas
                </Link>

                <Link to="/lancamento" className="p-4 bg-green-600 text-white rounded-lg flex items-center gap-3 hover:bg-green-700 transition shadow-lg">
                    <PlusCircle /> Lançar Conta
                </Link>

                <Link to="/abater" className="p-4 bg-purple-600 text-white rounded-lg flex items-center gap-3 hover:bg-purple-700 transition shadow-lg">
                    <Wallet /> Abater Dívida
                </Link>

                <Link to="/pessoas" className="p-4 bg-gray-600 text-white rounded-lg flex items-center gap-3 hover:bg-gray-700 transition shadow-lg">
                    <Users /> Gerenciar Pessoas
                </Link>
            </div>
        </div>
    )
}