import { Request, Response } from 'express';
import Order, { PaymentMethod } from '../../models/order';
import OrderItem from '../../models/orderItem';
import User from '../../models/user';
import Product from '../../models/product';

export default class OrderController {

  // Cria um novo pedido e seus itens
  static async store(req: Request, res: Response) {
    const { userId, orderItems, status, deliveryDetails, method_payment } = req.body;

    if (!userId || !orderItems || !Array.isArray(orderItems)) {
      return res.status(400).json({ error: 'O usuário e os itens do pedido são obrigatórios' });
    }

      // Verificar se o método de pagamento é válido
      if (! method_payment ) {
        return res.status(400).json({ error: 'Método de pagamento não informado' });
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
    order.method_payment = method_payment; // Define o método de pagamento


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

    //formatar saida da resposta
    const response = {
      user: {
        id: user.id
      },
      phone: order.phone,
      status: order.status,
      created_at: order.created_at.toISOString(),
      order_number: order.order_number,
      deliveryDetails: order.deliveryDetails,
      method_payment: order.method_payment,
      id: order.id,
      updated_at: order.updated_at ? order.updated_at.toISOString() : null
    };

    return res.status(201).json(response);
  }

  // Retorna todos os pedidos com detalhes dos itens
  static async findAll(req: Request, res: Response) {
    const orders = await Order.find({ relations: ['user', 'orderItems', 'orderItems.product'] });
    return res.json(orders);
  }

  static async findAllByUser(req: Request, res: Response) {
    const userId = req.params.userId; // Assume que o ID do cliente vem da URL
  
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    // Converte userId para number, se necessário
    const userIdNumber = Number(userId);
  
    const user = await User.findOneBy({ id: userIdNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    // if (isNaN(userIdNumber)) {
    //   return res.status(400).json({ error: 'Invalid User ID format' });
    // }
  
    try {
      const orders = await Order.find({
        //@ts-ignore
        where: {
          user: user.id, // Supondo que user é um número
        },
        relations: ['user', 'orderItems', 'orderItems.product'],
      });
  
      if (orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
  
      return res.json(orders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while retrieving orders' });
    }
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
