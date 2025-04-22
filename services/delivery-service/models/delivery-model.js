module.exports = class DeliveryModel {
  static db = require('../config/db');

  static async getAllDeliveries() {
    try {
      const deliveries = await this.db('entrega');
      return deliveries;
    } catch (error) {
      console.error('Error fetching deliveries:', error);
      throw error;
    }
  }

  static async getPendingDeliveries() {
    try {
      const pendingDeliveries = await this.db('pedido').where({ status: 'pronto' });

      return await Promise.all(
        pendingDeliveries.map(async (pedido) => {
          const endereco = await this.db('endereco').where({ id_endereco: pedido.id_endereco_entrega }).first();
          const cliente = await this.db('cliente').where({ id_cliente: pedido.id_cliente }).first();

          return {
            ...pedido,
            endereco,
            cliente,
          };
        })
      );
    } catch (error) {
      console.error('Error fetching pending deliveries:', error);
      throw error;
    }
  }

  static async getDeliveryById(id) {
    console.log('Fetching delivery with ID:', id);
    try {
      const delivery = await this.db('entrega').where({ id_entrega: id }).first();
      const pedido = await this.db('pedido').where({ id_pedido: delivery.id_pedido }).first();
      const endereco = await this.db('endereco').where({ id_endereco: pedido.id_endereco_entrega }).first();
      const cliente = await this.db('cliente').where({ id_cliente: pedido.id_cliente }).first();
      return {
        ...delivery,
        pedido,
        endereco,
        cliente,
      };
    } catch (error) {
      console.error('Error fetching delivery by ID:', error);
      throw error;
    }
  }

  static async createDelivery(orderId) {
    try {
      const order = await this.db('pedido').where({ id_pedido: orderId }).first();
      if (!order) {
        throw new Error('Order not found');
      }

      const deliveryData = {
        id_pedido: orderId,
        data_saida: new Date(),
        data_entrega: null,
        latitude: 1,
        longitude: 1,
      };

      const [newDelivery] = await this.db('entrega').insert(deliveryData).returning('*');

      await this.db('pedido').where({ id_pedido: orderId }).update({ status: 'em_entrega' });
      return newDelivery;
    } catch (error) {
      console.error('Error creating delivery:', error);
      throw error;
    }
  }

  static async updateDelivery(id, deliveryData) {
    console.log('Updating delivery with ID:', id);
    console.log('Delivery data:', deliveryData);
    try {
      await this.db('entrega').where({ id_entrega: id }).update(deliveryData).returning('*');
      return;
    } catch (error) {
      console.error('Error updating delivery:', error);
      throw error;
    }
  }

  static async finishDelivery(id) {
    try {
      const entrega = await this.db('entrega').where({ id_entrega: id }).first();
      const pedido = await this.db('pedido').where({ id_pedido: entrega.id_pedido }).first();

      await this.db('pedido').where({ id_pedido: pedido.id_pedido }).update({ status: 'entregue' });

      return;
    } catch (error) {
      console.error('Error finishing delivery:', error);
      throw error;
    }
  }
}