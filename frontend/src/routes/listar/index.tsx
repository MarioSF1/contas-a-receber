import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ListarDividas } from '@/components/ListarDividas'

export const Route = createFileRoute('/listar/')({
    component: RotaListar,
})

function RotaListar() {
    const navigate = useNavigate()
    return <ListarDividas onBack={() => navigate({ to: '/' })} />
}