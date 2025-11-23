# 💰 Sistema de Contas a Receber

Projeto Fullstack desenvolvido para estudo aprofundado de arquitetura em microsserviços com Java e Docker. O sistema permite o gerenciamento de devedores e títulos, com uma engine de baixa automática baseada em ordem cronológica.

## 🛠 Tecnologias Utilizadas

### Backend & Infraestrutura
- **Java 21** (LTS)
- **Spring Boot 3** (Web, Data JPA)
- **PostgreSQL 15**
- **Docker & Docker Compose**
- **Lombok** (Produtividade)

### Frontend
- **React** + **Vite**
- **TypeScript**
- **TanStack Query** (Gerenciamento de Estado/Cache)
- **TanStack Router** (Roteamento File-Based)
- **Tailwind CSS** (Estilização)
- **Electron** (Estrutura pronta para Desktop)

## ✨ Funcionalidades Principais
1. **Gestão de Pessoas:** CRUD completo com validação de integridade (cascade delete protegido).
2. **Lançamento de Contas:** Registro de dívidas com vencimento e valor.
3. **Abatimento Inteligente (FIFO):** Algoritmo no Backend que recebe um valor de pagamento e quita as dívidas da mais antiga para a mais recente automaticamente, gerando baixas parciais se necessário.
4. **Dashboard:** Listagem com filtros de status (Pagas/Pendentes).

## 🚀 Como rodar o projeto

Graças ao Docker, não é necessário instalar Java ou Postgres na sua máquina.

1. **Clone o repositório:**
   ```bash```
   git clone https://github.com/MarioSF1/contas-a-receber

2. **Suba o Backend e Banco de Dados:**
   ```bash```
   docker compose up --build

3. **Inicie o Frontend: Em outro terminal, na pasta /frontend:**
   ```bash```
   cd frontend
   npm install
   npm run dev
   