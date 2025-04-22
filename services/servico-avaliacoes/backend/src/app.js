const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const reviewsRouter = require('./routes/reviews');

const app = express();

// Configurações
app.use(cors()); 
app.use(bodyParser.json());

// Rota raiz (evita "Cannot GET /")
app.get('/', (req, res) => {
  res.send('Serviço de Avaliações está no ar! Use /api/reviews ou /api/health');
});

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Rotas da API
app.use('/api/reviews', reviewsRouter);

// Inicia o servidor
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Serviço de Avaliações rodando em http://localhost:${PORT}`);
});
