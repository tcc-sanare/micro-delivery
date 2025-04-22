/**
 * ## Documentação da API de Entregas
 *
 * ### Endpoints:
 *
 * #### GET `/`
 * - **Descrição**: Busca todas as entregas no banco de dados.
 * - **Resposta**: Renderiza uma visão com a lista de todas as entregas, incluindo detalhes do pedido, endereço e cliente associados.
 *
 * #### GET `/pending`
 * - **Descrição**: Busca todas as entregas pendentes (pedidos com status "pronto").
 * - **Resposta**: Renderiza uma visão com a lista de entregas pendentes, incluindo detalhes do pedido, endereço e cliente associados.
 *
 * #### GET `/:id`
 * - **Descrição**: Busca uma entrega específica pelo seu ID.
 * - **Parâmetros**:
 *   - `id` (parâmetro de rota): O ID da entrega a ser buscada.
 * - **Resposta**: Renderiza uma visão com os detalhes da entrega, incluindo informações do pedido, endereço e cliente associados.
 *
 * #### POST `/:orderId`
 * - **Descrição**: Cria uma nova entrega para um pedido específico.
 * - **Parâmetros**:
 *   - `orderId` (parâmetro de rota): O ID do pedido para o qual a entrega será criada.
 * - **Resposta**: Redireciona para a página de detalhes da nova entrega criada.
 *
 * #### POST `/:id/location`
 * - **Descrição**: Atualiza a localização ou outros detalhes de uma entrega existente.
 * - **Parâmetros**:
 *   - `id` (parâmetro de rota): O ID da entrega a ser atualizada.
 *   - Corpo da requisição: Contém os dados atualizados da entrega.
 * - **Resposta**: Retorna um status de sucesso se a atualização for bem-sucedida.
 *
 * #### POST `/:id/entregar`
 * - **Descrição**: Marca uma entrega como concluída e atualiza o status do pedido associado para "entregue".
 * - **Parâmetros**:
 *   - `id` (parâmetro de rota): O ID da entrega a ser marcada como concluída.
 * - **Resposta**: Redireciona para a lista de todas as entregas.
 *
 * ### Tratamento de Erros:
 * - Todos os endpoints retornam uma resposta `500 Internal Server Error` com uma mensagem em JSON caso ocorra um erro durante o processamento.
 */