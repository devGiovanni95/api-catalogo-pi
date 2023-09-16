import { Request, Response } from "express";
import product from "../../models/product";
import { Timestamp } from "typeorm";
import Product from "../../models/product";
import CategoryController from "../category/category.controller";
import Category from "../../models/category";

export default class ProductController {
  static async store(req: Request, res: Response) {
    const {
      name,
      description,
      price,
      color,
      promotion,
      expiration_date,
      category,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: "O nome é obrigatório" });
    }

    if (!description) {
      return res.status(400).json({ error: "A descrição é obrigatória" });
    }

    if (!price) {
      return res.status(400).json({ error: "O preço é obrigatório" });
    }

    if (!color) {
      return res.status(400).json({ error: "A cor é obrigatória" });
    }

    if (!expiration_date) {
      return res.status(400).json({ error: "A validade é obrigatória" });
    }

    if (!category) {
      return res.status(400).json({ error: "A categoria é obrigatória." });
    }

    const categoryId = await Category.findOneBy({id: Number(category)}) 

    if(!categoryId){
        return  res.status(400).json("Categoria não encontrada")
    }

    //const categoryId = new CategoryController();
    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.color = color;
    product.promotion = promotion;
    const data = new Date();
    product.created_at = data;
    product.expiration_date = expiration_date;
    product.category=category

    await product.save();

    return res.status(201).json(product);
  }

  static async findAll(req: Request, res: Response) {
    const listProducts = await Product.find();
    return res.json(listProducts);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    const product = await Product.findOneBy({ id: Number(id) });
    return res.json(product);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    const product = await Product.findOneBy({ id: Number(id) });
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrada" });
    }

    await product.remove();
    return res.status(204).json();
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      color,
      promotion,
      expiration_date,
      category,
    } = req.body;

    const product = await Product.findOneBy({ id: Number(id) });

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    product.id = Number(id);
    if (name) {
      product.name = name;
    }

    if (description) {
      product.description = description;
    }

    if (price) {
      product.price = price;
    }
    if (color) {
      product.color = color;
    }

    if (promotion) {
      product.promotion = promotion;
    }

    if (expiration_date) {
      product.expiration_date = expiration_date;
    }

    if (category) {
      product.category = category;
    }

    const date = new Date();
    product.updated_at = date;

    await product.save();

    return res.status(201).json(product);
  }
}
