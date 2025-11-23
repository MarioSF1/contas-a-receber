import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft, Wallet, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import type { Pessoa } from '../types';

export function AbaterDivida({ onBack }: { onBack: () => void }) {
    const queryClient = useQueryClient();
    const [pessoaId, setPessoaId] = useState('');
    const [valor, setValor] = useState('');

    // Busca as pessoas para o Select
    const { data: pessoas } = useQuery<Pessoa[]>({
        queryKey: ['pessoas'],
        queryFn: async () => (await axios.get('http://localhost:8080/api/pessoas')).data
    });

    // Função que manda o dinheiro para o Java
    const mutation = useMutation({
        mutationFn: async () => {
            return axios.post('http://localhost:8080/api/abater', {
                pessoaId: parseInt(pessoaId),
                valor: parseFloat(valor)
            });
        },
        onSuccess: () => {
            alert('Abatimento realizado com sucesso!');
            // Atualiza o cache das contas para a tela de listagem mostrar os novos valores
            queryClient.invalidateQueries({ queryKey: ['contas'] });
            setValor(''); // Limpa o campo
        },
        onError: () => alert('Erro ao processar pagamento.')
    });

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <button onClick={onBack} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800">
                <ArrowLeft size={20} /> Voltar
            </button>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 mb-6">
                <h2 className="text-2xl font-bold text-purple-800 flex items-center gap-2 mb-2">
                    <Wallet /> Abater Dívidas
                </h2>
                <p className="text-purple-600 text-sm">
                    O valor informado será usado para quitar as dívidas mais antigas automaticamente.
                </p>
            </div>

            <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Quem está pagando?</label>
                    <select
                        className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
                        value={pessoaId}
                        onChange={e => setPessoaId(e.target.value)}
                    >
                        <option value="">Selecione uma pessoa...</option>
                        {pessoas?.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Qual o valor do pagamento?</label>
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500 font-bold">R$</span>
                        <input
                            type="number"
                            className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none font-bold text-lg"
                            value={valor}
                            onChange={e => setValor(e.target.value)}
                            placeholder="0,00"
                        />
                    </div>
                </div>

                <button
                    onClick={() => mutation.mutate()}
                    disabled={!pessoaId || !valor || mutation.isPending}
                    className="w-full bg-purple-600 text-white p-4 rounded-lg font-bold text-lg hover:bg-purple-700 disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
                >
                    {mutation.isPending ? 'Processando...' : <><CheckCircle /> Confirmar Pagamento</>}
                </button>
            </div>
        </div>
    );
}