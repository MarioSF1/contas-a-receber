package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.Comparator;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class FinanceiroController {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private ContaRepository contaRepository;

    // --- ROTAS DE PESSOA ---

    @PostMapping("/pessoas")
    public Pessoa criarPessoa(@RequestBody Pessoa pessoa) {
        return pessoaRepository.save(pessoa);
    }

    @GetMapping("/pessoas")
    public List<Pessoa> listarPessoas() {
        return pessoaRepository.findAll();
    }

    @DeleteMapping("/pessoas/{id}")
    public ResponseEntity<Void> deletarPessoa(@PathVariable Long id) {
        try {
            pessoaRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // Retorna 204 (Sucesso sem conteúdo)
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // --- ROTAS DE CONTA ---

    @PostMapping("/contas")
    public Conta criarConta(@RequestBody Conta conta) {
        return contaRepository.save(conta);
    }

    @GetMapping("/contas")
    public List<Conta> listarContas() {
        return contaRepository.findAll();
    }

    @PostMapping("/abater")
    public ResponseEntity<String> abaterDivida(@RequestBody AbatimentoRequest request) {
        List<Conta> contas = contaRepository.findAll().stream()
                .filter(c -> c.getPessoa().getId().equals(request.getPessoaId()))
                .filter(c -> c.getValorPago() < c.getValor())
                .sorted(Comparator.comparing(Conta::getDataVencimento))
                .toList();

        Double valorDisponivel = request.getValor();
        int contasPagas = 0;

        // O algoritmo "FIFO" (First-In, First-Out)
        for (Conta conta : contas) {
            if (valorDisponivel <= 0)
                break;

            Double faltaPagar = conta.getValor() - conta.getValorPago();

            if (valorDisponivel >= faltaPagar) {
                conta.setValorPago(conta.getValor());
                valorDisponivel -= faltaPagar;
                contasPagas++;
            } else {
                conta.setValorPago(conta.getValorPago() + valorDisponivel);
                valorDisponivel = 0.0;
            }

            contaRepository.save(conta);
        }

        return ResponseEntity.ok("Processamento concluído! Contas quitadas/abatidas: " + contasPagas);
    }
}