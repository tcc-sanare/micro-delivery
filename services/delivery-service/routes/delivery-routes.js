const router = require('express').Router();
const DeliveryController = require('../controllers/delivery-controller');

router.get('/', DeliveryController.getAllDeliveries);
router.get('/pending', DeliveryController.getPendingDeliveries);
router.get('/:id', DeliveryController.getDeliveryById);
router.post('/:orderId', DeliveryController.createDelivery);
router.post('/:id/location', DeliveryController.updateDelivery);
router.post('/:id/entregar', DeliveryController.finishDelivery);

module.exports = router;