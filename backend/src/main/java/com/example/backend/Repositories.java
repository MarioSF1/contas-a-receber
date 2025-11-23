package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Repositório da Pessoa
@Repository
interface PessoaRepository extends JpaRepository<Pessoa, Long> {
}

// Repositório da Conta
@Repository
interface ContaRepository extends JpaRepository<Conta, Long> {
}