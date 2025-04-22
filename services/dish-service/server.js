const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const dishRouter = require('./routes/dish-route');
const path = require('path')

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));


app.use(dishRouter);


const PORT = 3002
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});