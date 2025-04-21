
# 📦 Serviço de Clientes e Restaurantes

Este projeto foi desenvolvido como parte da avaliação do componente curricular Sistemas Web II, com o objetivo de criar um sistema de gerenciamento para clientes, restaurantes e entregadores (delivery).

## ⚙️ Como rodar o projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/joicexz/cliente-restaurante.git
   ```

2. **Instale as dependências**
   ```bash
   npm i
   npm install vite
   ```

4. **Execute o Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Execute o Backend (em outra aba do terminal)**
   ```bash
   npm run dev
   ```

---

## 📦 Estrutura do projeto

```
    cliente-restaurante/
│
├── config/              # Configurações do banco de dados
├── controllers/         # Lógica de controle (users, restaurantes, entregadores)
├── frontend/
│   └── src/
│       ├── pages/       # Páginal principal (Home)
│       ├── services/    # Serviços de API e autenticação (Axios)
│       └── components/  
│           ├── Auth/    # Componentes de Login e Registro
│           └── Layout/  # Componentes visuais como Navbar
│   └── vite.config.js   # Configuração do Vite
├── models/              # Modelos de banco de dados
├── routes/              # Definição de rotas da API
└── app.js               # Arquivo principal do backend (Express)

```

---

## 🌐 Exemplos de Requisições

###  Login

**POST** `/api/login`

```json
{
  "email": "cliente@exemplo.com",
  "senha": "senha123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "tipo": "cliente" }
}
```

---

### Cadastro de Restaurante

**POST** `/api/register/restaurante`

**Body:**
```json
{
  "nome": "Restaurante XYZ",
  "cnpj": "12345678000199",
  "email": "restaurante@exemplo.com",
  "senha": "senhasegura"
}
```

---

## 🛠 Tecnologias Utilizadas

- Frontend: React + Vite
- Backend: Node.js + Express
- Banco de Dados: MySQL
- Autenticação: JWT (JSON Web Token) 
- Segurança: Bcrypt (hash de senhas)
- Requisições HTTP: Axios

---

## Conslusão:
Este projeto atende aos requisitos do Serviço 1, oferecendo cadastro, login e autenticação (JWT), sendo uma base sólida e segura para o gerenciamento de clientes e restaurantes dentro de um sistema de delivery.