import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LancarConta } from '@/components/LancarConta' // Importe seu componente antigo

export const Route = createFileRoute('/lancamento/')({
    component: LancarPage,
})

function LancarPage() {
    const navigate = useNavigate()
    // Passamos uma função que volta para a Home usando o Router
    return <LancarConta onBack={() => navigate({ to: '/' })} />
}