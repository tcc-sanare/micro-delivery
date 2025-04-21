const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.listen(3004, () => {
  console.log('Orders service is running on port 3004');
});