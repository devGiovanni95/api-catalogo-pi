/*
import { Request, Response } from 'express';
import Order from '../../models/order';
import OrderItem from '../../models/orderItem';
import User from '../../models/user';
import Product from '../../models/product';
export default class OrderController {

  static async store(req: Request, res: Response) {
    const { userId, orderItems, status } = req.body;

    if (!userId || !orderItems || !Array.isArray(orderItems)) {
      return res.status(400).json({ error: 'O usuário e os itens do pedido são obrigatórios' });
    }

    // Verifique se o usuário existe
    const user = await User.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Crie o pedido
    const order = new Order();
    order.user = user;
    order.status = status || 'pending';
    order.created_at = new Date();

    await order.save();

    // Adicione os itens ao pedido
    for (const item of orderItems) {
      const { productId, quantity, price } = item;

      // Verifique se o produto existe
      const product = await Product.findOneBy({ id: productId });
      if (!product) {
        return res.status(404).json({ error: `Produto com ID ${productId} não encontrado` });
      }

      const orderItem = new OrderItem();
      orderItem.order = order;
      orderItem.product = product;
      orderItem.quantity = quantity;
      orderItem.price = price;

      await orderItem.save();
    }

    return res.status(201).json(order);
  }

  static async findAll(req: Request, res: Response) {
    const orders = await Order.find({ relations: ['user', 'orderItems', 'orderItems.product'] });
    return res.json(orders);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O ID é obrigatório' });
    }

    const order = await Order.findOne({
      where: { id: Number(id) },
      relations: ['user', 'orderItems', 'orderItems.product'],
    });

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    return res.json(order);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O ID é obrigatório' });
    }

    const order = await Order.findOneBy({ id: Number(id) });
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    await order.remove();
    return res.status(204).json();
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O ID é obrigatório' });
    }

    const order = await Order.findOneBy({ id: Number(id) });
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    if (status) {
      order.status = status;
    }
    order.updated_at = new Date();

    await order.save();
    return res.json(order);
  }
}
*/

import { Request, Response } from 'express';
import Order from '../../models/order';
import OrderItem from '../../models/orderItem';
import User from '../../models/user';
import Product from '../../models/product';

export default class OrderController {

  // Cria um novo pedido e seus itens
  static async store(req: Request, res: Response) {
    const { userId, orderItems, status, deliveryDetails } = req.body;

    if (!userId || !orderItems || !Array.isArray(orderItems)) {
      return res.status(400).json({ error: 'O usuário e os itens do pedido são obrigatórios' });
    }

    const user = await User.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const order = new Order();
    order.user = user;
    order.phone = user.phone;
    order.status = status || 'pending';
    order.created_at = new Date();
    order.order_number = `ORD-${Date.now()}`; // Gerar número de pedido único
    order.deliveryDetails = deliveryDetails || {}; 

    await order.save();

    // Adiciona itens ao pedido
    for (const item of orderItems) {
      const { productId, quantity, price } = item;

      const product = await Product.findOneBy({ id: productId });
      if (!product) {
        return res.status(404).json({ error: `Produto com ID ${productId} não encontrado` });
      }

      const orderItem = new OrderItem();
      orderItem.order = order;
      orderItem.product = product;
      orderItem.quantity = quantity;
      orderItem.price = price;

      await orderItem.save();
    }

    return res.status(201).json(order);
  }

  // Retorna todos os pedidos com detalhes dos itens
  static async findAll(req: Request, res: Response) {
    const orders = await Order.find({ relations: ['user', 'orderItems', 'orderItems.product'] });
    return res.json(orders);
  }

  // Retorna um pedido específico pelo ID com detalhes dos itens
  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O ID é obrigatório' });
    }

    const order = await Order.findOne({
      where: { id: Number(id) },
      relations: ['user', 'orderItems', 'orderItems.product'],
    });

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    return res.json(order);
  }

  // Remove um pedido pelo ID
  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O ID é obrigatório' });
    }

    const order = await Order.findOneBy({ id: Number(id) });
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    await order.remove();
    return res.status(204).json();
  }

  // Atualiza o status de um pedido
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O ID é obrigatório' });
    }

    const order = await Order.findOneBy({ id: Number(id) });
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    if (status) {
      order.status = status;
    }

    
    order.updated_at = new Date();

    await order.save();
    return res.json(order);
  }
}
