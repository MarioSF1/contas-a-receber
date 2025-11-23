import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AbaterDivida } from '@/components/AbaterDivida'

export const Route = createFileRoute('/abater/')({
    component: RotaAbater,
})

function RotaAbater() {
    const navigate = useNavigate()
    return <AbaterDivida onBack={() => navigate({ to: '/' })} />
}