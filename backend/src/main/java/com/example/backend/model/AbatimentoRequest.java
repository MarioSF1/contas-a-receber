package com.example.backend;

import lombok.Data;

@Data
public class AbatimentoRequest {
    private Long pessoaId;
    private Double valor;
}