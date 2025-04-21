const db = require('../config/db');

module.exports = class OrdersModel {
  static db = db;

  static async getAllOrders() {
    try {
      const orders = await this.db('pedido').select('*');
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  static async createOrder(data) {
    try {
      const {
        id_cliente,
        dishes: dishesIds,
        endereco,
        metodo_pagamento,
        observacoes
      } = data;

      const id_endereco = await this.db('endereco').insert({
        rua: endereco,
        cep: '00000-000',
        numero: '0',
        estado: 'SP',
        cidade: 'São Paulo',
        pais: 'Brasil',
        bairro: 'Centro',
      }).then(res => res[0]);

      const dishes = await this.db('prato').whereIn('id_prato', JSON.parse(dishesIds).map(dish => dish.id_prato));

      console.log('Dishes:', dishes);

      const order = await this.db('pedido').insert({
        id_cliente,
        id_endereco_entrega: id_endereco,
        metodo_pagamento,
        observacoes,
        valor_total: dishes.reduce((total, dish) => total + (+dish.preco * JSON.parse(dishesIds).find(d => d.id_prato === dish.id_prato).quantidade), 0),
        status: 'preparando',
        status_pagamento: 'pago',
      });

      const orderId = order[0];

      const orderDishes = JSON.parse(dishesIds).map(dish => ({
        id_pedido: orderId,
        id_prato: dish.id_prato,
        preco_unitario: +dishes.find(d => d.id_prato === dish.id_prato).preco,
        quantidade: dish.quantidade,
        observacoes: dish.observacoes,
      }));
      await this.db('item_pedido').insert(orderDishes);

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  static async createOrderPage() {
    try {
      const pratos = await this.db('prato').select('*');
      return pratos;
    } catch (error) {
      console.error('Error fetching dishes for order creation:', error);
      throw error;
    }
  }

  static async updateOrderStatus(orderId, status) {
    try {
      const updatedOrder = await this.db('pedido')
        .where({ id_pedido: orderId })
        .update({ status })
        .returning('*');

      return updatedOrder;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  static async updateOrderStatusPage(orderId) {

    try {
      const order = await this.db('pedido').where({ id_pedido: orderId }).first();

      return order;
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}