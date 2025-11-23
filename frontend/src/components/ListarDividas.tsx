import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import type { Conta } from '@/types';

export function ListarDividas({ onBack }: { onBack: () => void }) {
    const [filtro, setFiltro] = useState<'todas' | 'pagas' | 'pendentes'>('pendentes');

    const { data: contas } = useQuery<Conta[]>({
        queryKey: ['contas'],
        queryFn: async () => (await axios.get('http://localhost:8080/api/contas')).data
    });

    // Lógica de filtro no Frontend (Pode ser no backend no futuro)
    const contasFiltradas = contas?.filter(conta => {
        const isPaga = conta.valorPago >= conta.valor;
        if (filtro === 'pagas') return isPaga;
        if (filtro === 'pendentes') return !isPaga;
        return true;
    });

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-800">
                    <ArrowLeft size={20} /> Voltar
                </button>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                    {['pendentes', 'pagas', 'todas'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFiltro(f as any)}
                            className={`px-4 py-1 rounded capitalize ${filtro === f ? 'bg-white shadow text-blue-600 font-bold' : 'text-gray-500'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                {contasFiltradas?.map(conta => {
                    const saldoDevedor = conta.valor - conta.valorPago;
                    const isPaga = saldoDevedor <= 0;

                    return (
                        <div key={conta.id} className="border p-4 rounded-lg flex justify-between items-center hover:shadow-md transition">
                            <div>
                                <h3 className="font-bold text-lg">{conta.pessoa.nome}</h3>
                                <p className="text-gray-500 text-sm">{conta.observacao} - Venc: {conta.dataVencimento}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-bold">R$ {conta.valor.toFixed(2)}</div>
                                {isPaga ? (
                                    <span className="text-green-600 flex items-center gap-1 justify-end text-sm"><CheckCircle size={14} /> Paga</span>
                                ) : (
                                    <span className="text-red-500 flex items-center gap-1 justify-end text-sm">
                                        <XCircle size={14} /> Resta: R$ {saldoDevedor.toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
                {contasFiltradas?.length === 0 && <p className="text-center text-gray-500 mt-10">Nenhuma conta encontrada.</p>}
            </div>
        </div>
    );
}