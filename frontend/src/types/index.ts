// src/types/index.ts
export interface Pessoa {
    id: number;
    nome: string;
}

export interface Conta {
    id: number;
    valor: number;
    valorPago: number; // O campo novo
    dataVencimento: string;
    observacao: string;
    pessoa: Pessoa;
}