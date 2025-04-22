# 🍕 Microserviço 2 - Cardápio

Microserviço responsável pelo gerenciamento do cardápio dos restaurantes.

---

## 🚀 Como iniciar

```bash
npm install
docker compose up -d
docker ps
npx tsx --watch src/server.ts
```

---

## 🧰 Tecnologias

- Node.js
- TypeScript
- Prisma
- Docker
- Kafka

---

## 📬 Exemplos de Requisições

### 🔍 Requisição `GET` - Listar pratos de um restaurante

```http
GET http://localhost:3001/dishes/id=3
```

#### 📌 Query Parameters

| Parâmetro | Descrição                  | Exemplo |
|-----------|----------------------------|---------|
| `id`      | ID do restaurante desejado | `3`     |

---

### 📥 Resposta esperada

```json
[
  {
    "id": "c9869122-612f-4506-95ed-db54320724c5",
    "id_restaurante": "3",
    "nome": "Pizza",
    "descricao": "Pizza com molho de tomate e queijo",
    "preco": 300,
    "ingredientes": "tomate, queijo, manjericão",
    "tempo_preparo": 1,
    "disponivel": true,
    "destaque": false
  }
]
```

---

### 🔍 Requisição `POST` - Criar novo prato 

```http
POST http://localhost:3001/dishes
```

#### 📌 Body 

```json
 {
    "id_restaurante": "1",
    "nome": "Pizza de Frango",
    "descricao": "Pizza com molho de tomate, queijo e frango",
    "preco": 29.9,
    "ingredientes": "tomate, queijo, manjericão, frango",
    "tempo_preparo": 1,
    "disponivel": true,
    "destaque": false
  }
```

---

### 📥 Resposta esperada

```json
 {
    "id_restaurante": "1",
    "nome": "Pizza de Frango",
    "descricao": "Pizza com molho de tomate, queijo e frango",
    "preco": 29.9,
    "ingredientes": "tomate, queijo, manjericão, frango",
    "tempo_preparo": 1,
    "disponivel": true,
    "destaque": false
  }
```
---

### 🔍 Requisição `PUT` - Mudar preço de um prato específico

```http
PUT localhost:3001/dishes/2ac32014-cc4f-437e-af0b-65f85707bd7d
```

#### 📌 Query Parameters

| Parâmetro | Descrição                  | Exemplo |
|-----------|----------------------------|---------|
| `id`      | ID do prato desejado | `2ac32014-cc4f-437e-af0b-65f85707bd7d`     |

---

#### 📌 Body 

```json
{
  "preco": 30
}
```

---

### 📥 Resposta esperada

```json
{
  "id": "c9869122-612f-4506-95ed-db54320724c5",
  "id_restaurante": "1",
  "nome": "Pizza de Frango",
  "descricao": "Pizza com molho de tomate, queijo e frango",
  "preco": 30,
  "ingredientes": "tomate, queijo, manjericão, frango",
  "tempo_preparo": 1,
  "disponivel": true,
  "destaque": false
}
```
---