const router = require('express').Router();
const OrdersController = require('../controllers/orders-controller');

router.get('/', OrdersController.getAllOrders);
router.get('/new', OrdersController.createOrderPage);
router.get('/:orderId/update', OrdersController.updateOrderStatusPage);
router.post('/', OrdersController.createOrder);
router.post('/:orderId/status', OrdersController.updateOrderStatus);

module.exports = router;