import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft, Trash2, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import type { Pessoa } from '../types';

export function GerenciarPessoas({ onBack }: { onBack: () => void }) {
    const queryClient = useQueryClient();
    const [novoNome, setNovoNome] = useState('');

    // 1. Busca a lista de pessoas
    const { data: pessoas } = useQuery<Pessoa[]>({
        queryKey: ['pessoas'],
        queryFn: async () => (await axios.get('http://localhost:8080/api/pessoas')).data
    });

    // 2. Criação (POST)
    const criarMutation = useMutation({
        mutationFn: async () => {
            return axios.post('http://localhost:8080/api/pessoas', { nome: novoNome });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pessoas'] }); // Atualiza a lista
            setNovoNome(''); // Limpa o campo
        }
    });

    // 3. Exclusão (DELETE)
    const deletarMutation = useMutation({
        mutationFn: async (id: number) => {
            return axios.delete(`http://localhost:8080/api/pessoas/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pessoas'] });
            // Removemos o alerta de erro e invalidamos também as contas, 
            // pois se apagou pessoa, apagou conta, então a lista de dívidas mudou.
            queryClient.invalidateQueries({ queryKey: ['contas'] });
            alert("Pessoa e todas as suas contas foram excluídas!");
        },
        onError: () => {
            alert("Erro ao excluir pessoa.");
        }
    });

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <button onClick={onBack} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800">
                <ArrowLeft size={20} /> Voltar
            </button>

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users /> Gerenciar Pessoas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LADO ESQUERDO: Formulário */}
                <div className="bg-white p-6 rounded-lg shadow border h-fit">
                    <h3 className="font-bold text-lg mb-4 text-gray-700">Cadastrar Nova</h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nome da pessoa..."
                            value={novoNome}
                            onChange={e => setNovoNome(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && criarMutation.mutate()}
                        />
                        <button
                            onClick={() => criarMutation.mutate()}
                            disabled={!novoNome}
                            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            <UserPlus size={20} />
                        </button>
                    </div>
                </div>

                {/* LADO DIREITO: Lista */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="font-bold text-lg mb-4 text-gray-700">Pessoas Cadastradas</h3>

                    <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                        {pessoas?.map(pessoa => (
                            <li key={pessoa.id} className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 group">
                                <span className="font-medium">{pessoa.nome}</span>

                                <button
                                    onClick={() => {
                                        // Aviso mais severo agora que apaga tudo
                                        if (confirm(`ATENÇÃO: Excluir ${pessoa.nome} apagará também TODAS as contas e histórico dele(a).\nDeseja continuar?`)) {
                                            deletarMutation.mutate(pessoa.id);
                                        }
                                    }}
                                    className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                    title="Excluir pessoa e contas"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </li>
                        ))}

                        {pessoas?.length === 0 && (
                            <p className="text-gray-400 text-sm italic">Ninguém cadastrado ainda.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}