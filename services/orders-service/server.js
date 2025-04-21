const express = require('express');
const cors = require('cors');
const ordersRoute = require('./routes/orders-route');
const path = require('path');

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/orders/', ordersRoute);

app.listen(3004, () => {
  console.log('Orders service is running on port 3004');
});