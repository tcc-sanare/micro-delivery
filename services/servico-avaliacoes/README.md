# 📝 Serviço de Avaliações - Delivery API

Este é um microsserviço de avaliações para um sistema de delivery, desenvolvido com Node.js e Express. Ele permite que usuários avaliem pedidos, restaurantes e entregadores. Parte de uma arquitetura baseada em microserviços. 🌐

## 📦 Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- cors
- body-parser
- nodemon (dev)

## ⚙️ Como Executar

### 🔧 Pré-requisitos

- Node.js instalado
- Banco de dados MySQL rodando
- Variáveis de ambiente definidas ou use os valores padrão (localhost, root, delivery_db)

### ▶️ Executar o servidor

npm install        # Instala as dependências
npm start          # Inicia o servidor (modo produção)
npm run dev        # Inicia com nodemon (modo desenvolvimento)

Servidor padrão roda em: http://localhost:3005

## 🌐 Endpoints

### 🔍 Health Check

GET /api/health

Resposta:

{
  "status": "UP"
}

### 📬 Avaliações

➕ Criar Avaliação  
POST /api/reviews

Body:
{
  "order_id": 123,
  "restaurant_id": 456,
  "user_id": 789,
  "rating": 5,
  "comment": "Entrega super rápida, recomendo!"
}

📄 Listar Avaliações  
GET /api/reviews  
ou  
GET /api/reviews?restaurant_id=456 (filtra por restaurante)

## 🗂 Estrutura de Pastas

servico-avaliacoes/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── reviewsController.js
│   │   ├── models/
│   │   │   └── Review.js
│   │   ├── routes/
│   │   │   └── app.js
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
├── frontend/
│   └── public/
│       ├── css/
│       ├── js/
│       │   └── main.js
│       ├── avaliacoes.html
│       └── index.html