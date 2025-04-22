# Documentação dos Endpoints - Orders Service

Este documento descreve os endpoints disponíveis no serviço de pedidos.

## Endpoints

### 1. **Listar Pedidos**
- **Rota:** `GET /`
- **Descrição:** Retorna uma lista de todos os pedidos.
- **Resposta:** Renderiza a página `orders` com os pedidos.

---

### 2. **Página de Criação de Pedido**
- **Rota:** `GET /new`
- **Descrição:** Retorna a página para criação de um novo pedido.
- **Resposta:** Renderiza a página `new-order` com os pratos disponíveis.

---

### 3. **Criar Pedido**
- **Rota:** `POST /`
- **Descrição:** Cria um novo pedido com base nos dados fornecidos.
- **Corpo da Requisição:**
  ```json
  {
    "id_cliente": "string",
    "dishes": "[{id_prato, quantidade, observacoes}]",
    "endereco": "string",
    "metodo_pagamento": "string",
    "observacoes": "string"
  }
  ```
- **Resposta:** Retorna o pedido criado.

---

### 4. **Página de Atualização de Status**
- **Rota:** `GET /:orderId/update`
- **Descrição:** Retorna a página para atualizar o status de um pedido.
- **Parâmetros:**
  - `orderId`: ID do pedido.
- **Resposta:** Renderiza a página `update-status` com os dados do pedido.

---

### 5. **Atualizar Status do Pedido**
- **Rota:** `POST /:orderId/status`
- **Descrição:** Atualiza o status de um pedido.
- **Parâmetros:**
  - `orderId`: ID do pedido.
- **Corpo da Requisição:**
  ```json
  {
    "status": "string"
  }
  ```
- **Resposta:** Retorna o pedido atualizado.

---

## Observações
- Certifique-se de que os dados enviados no corpo da requisição estejam no formato correto.
- Em caso de erro, o serviço retorna uma mensagem de erro com status HTTP 500.
