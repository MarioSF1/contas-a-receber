import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { GerenciarPessoas } from '@/components/GerenciarPessoas'

export const Route = createFileRoute('/pessoas/')({
    component: RotaPessoas,
})

function RotaPessoas() {
    const navigate = useNavigate()
    return <GerenciarPessoas onBack={() => navigate({ to: '/' })} />
}