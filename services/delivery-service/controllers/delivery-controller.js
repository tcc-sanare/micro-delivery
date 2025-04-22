const DeliveryModel = require('../models/delivery-model');

module.exports = class DeliveryController {
  static async getAllDeliveries(req, res) {
    try {
      const deliveries = await DeliveryModel.getAllDeliveries();
      res.status(200).render('deliveries', { deliveries: await Promise.all(deliveries.map(async (delivery) => {
        const pedido = await DeliveryModel.db('pedido').where({ id_pedido: delivery.id_pedido }).first();
        const endereco = await DeliveryModel.db('endereco').where({ id_endereco: pedido.id_endereco_entrega }).first();
        const cliente = await DeliveryModel.db('cliente').where({ id_cliente: pedido.id_cliente }).first();

        return {
          ...delivery,
          pedido,
          endereco,
          cliente,
        };
      }))});
    } catch (error) {
      console.error('Error fetching deliveries:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getPendingDeliveries(req, res) {
    try {
      const orders = await DeliveryModel.getPendingDeliveries();
      res.status(200).render('pending-deliveries', { orders });
    } catch (error) {
      console.error('Error fetching pending deliveries:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getDeliveryById(req, res) {
    const { id } = req.params;
    try {
      const delivery = await DeliveryModel.getDeliveryById(id);
      if (!delivery) {
        return res.status(404).json({ message: 'Delivery not found' });
      }
      res.status(200).render('delivery', { delivery });
    } catch (error) {
      console.error('Error fetching delivery by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async createDelivery(req, res) {
    const { orderId } = req.params;
    try {
      const newDelivery = await DeliveryModel.createDelivery(orderId);
      res.status(201).redirect('/deliveries/' + newDelivery);
    } catch (error) {
      console.error('Error creating delivery:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateDelivery(req, res) {
    const { id } = req.params;
    const deliveryData = req.body;
    try {
      await DeliveryModel.updateDelivery(id, deliveryData);
  
      res.status(200).send();
    } catch (error) {
      console.error('Error updating delivery:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async finishDelivery(req, res) {
    const { id } = req.params;
    try {
      await DeliveryModel.finishDelivery(id);
      res.status(200).redirect('/deliveries');
    } catch (error) {
      console.error('Error updating delivery status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}