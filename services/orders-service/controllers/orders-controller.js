const OrdersModel = require('../models/orders-model');

module.exports = class OrdersController {
  static async getAllOrders(req, res) {
    try {
      const orders = await OrdersModel.getAllOrders();
      res.status(200).render('orders', { orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createOrder(req, res) {
    try {
      const order = await OrdersModel.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createOrderPage(req, res) {
    try {
      const pratos = await OrdersModel.createOrderPage();
      res.status(201).render('new-order', { pratos });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateOrderStatus(req, res) {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      const updatedOrder = await OrdersModel.updateOrderStatus(orderId, status);
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateOrderStatusPage(req, res) {
    const { orderId } = req.params;

    try {
      const order = await OrdersModel.updateOrderStatusPage(orderId);
      res.status(200).render('update-status', { order });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}