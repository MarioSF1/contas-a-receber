import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';
import type { Pessoa } from '@/types';

export function LancarConta({ onBack }: { onBack: () => void }) {
    const queryClient = useQueryClient();

    // Estados do formulário
    const [pessoaId, setPessoaId] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [obs, setObs] = useState('');

    // Busca Pessoas
    const { data: pessoas } = useQuery<Pessoa[]>({
        queryKey: ['pessoas'],
        queryFn: async () => (await axios.get('http://localhost:8080/api/pessoas')).data
    });

    // Envia Conta
    const mutation = useMutation({
        mutationFn: async () => {
            return axios.post('http://localhost:8080/api/contas', {
                valor: parseFloat(valor),
                dataVencimento: data,
                observacao: obs,
                pessoa: { id: parseInt(pessoaId) } // Formato que o Java espera
            });
        },
        onSuccess: () => {
            alert('Conta lançada com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['contas'] }); // Atualiza listas
            onBack();
        }
    });

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <button onClick={onBack} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800">
                <ArrowLeft size={20} /> Voltar
            </button>

            <h2 className="text-2xl font-bold mb-6">Lançar Nova Conta</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Devedor</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={pessoaId}
                        onChange={e => setPessoaId(e.target.value)}
                    >
                        <option value="">Selecione uma pessoa...</option>
                        {pessoas?.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Valor (R$)</label>
                    <input type="number" className="w-full p-2 border rounded" value={valor} onChange={e => setValor(e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Vencimento</label>
                    <input type="date" className="w-full p-2 border rounded" value={data} onChange={e => setData(e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Observação</label>
                    <textarea className="w-full p-2 border rounded" value={obs} onChange={e => setObs(e.target.value)} />
                </div>

                <button
                    onClick={() => mutation.mutate()}
                    disabled={!pessoaId || !valor || !data}
                    className="w-full bg-green-600 text-white p-3 rounded flex justify-center items-center gap-2 hover:bg-green-700 disabled:opacity-50"
                >
                    <Save size={20} /> Salvar Conta
                </button>
            </div>
        </div>
    );
}