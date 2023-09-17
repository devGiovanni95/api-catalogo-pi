import { Request, Response } from "express";
import product from "../../models/product";
import { Timestamp } from "typeorm";
import Product from "../../models/product";
import CategoryController from "../category/category.controller";
import User from "../../models/user";
import { hash } from "bcryptjs";

export default class ProductController {
  static async store(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      created_at,
      updated_at
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: "O nome é obrigatório" });
    }

    if (!email) {
      return res.status(400).json({ error: "O e-mail é obrigatório" });
    }

    const emailExists = await User.findOneBy({email: email})

    if (emailExists){
        return  res.status(400).json({error: "O email já cadastrado"})
    }

    if (!password) {
      return res.status(400).json({ error: "O password é obrigatório" });
    }

   const hashPassword = await hash(password, 8) 


    const user = new User();

    user.name = name;
    user.email = email;
    user.password = hashPassword;
    const data = new Date();
    user.created_at = data;

    await user.save();
    return res.status(201).json(user);
  }

  static async findAll(req: Request, res: Response) {
    const users = await User.find();
    return res.json(users);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.findOneBy({ id: Number(id) });

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }
    
    if(!user){
      return res.status(400).json({ message: "Usuário não encontrado verifique o id digitado" });
    }
    return res.json(user);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    const user = await User.findOneBy({ id: Number(id) });
    if (!user) {
      return res.status(404).json({ error: "Produto não encontrada" });
    }

    await user.remove();
    return res.status(204).json();
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      created_at,
      updated_at
    } = req.body;

    const user = await User.findOneBy({ id: Number(id) });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

   // user.id = Number(id);
    if (name) {
      user.name = name;
    }

    if(email){
      const emailExists = await User.findOneBy({email: email})
      if (emailExists){
          return  res.status(400).json({error: "O email já cadastrado"})
      }
      user.email = email;
    }

    const date = new Date();
    user.updated_at = date;

    await user.save();

    return res.status(201).json(user);
  }
}
