import { Request, Response } from "express";
import { DataSource, QueryBuilder, Timestamp, createQueryBuilder, getRepository } from "typeorm";
import Product from "../../models/product";
import CategoryController from "../category/category.controller";
import Category from "../../models/category";
import Photo from "../../models/photo";

export default class PhotoController {
  static async store(req: Request, res: Response) {
    const {
      product,
      photo_path,
      // main_photo
    } = req.body

    if (!product) {
      return res.status(400).json({ error: "O id do produto é obrigatória." });
    }

    // if (!main_photo) {
    //   return res.status(400).json({ error: "A foto principal do produto é obrigatória." });
    // }

    const productId = await Category.findOneBy({id: Number(product)}) 

    if(!productId){
        return  res.status(400).json("Produto não encontradao")
    }

    if (!photo_path) {
      return res.status(400).json({ error: "O caminho da foto é obrigatória" });
    }

    const photo = new Photo();
    const categoryId = new CategoryController();
    photo.photo_path=photo_path;
    photo.product=product
   
    await photo.save();

    return res.status(201).json(photo);
  }

  static async findAll(req: Request, res: Response) {
    const listPhotos = await Photo.find();
    return res.json(listPhotos);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    const photo = await Photo.findOneBy({ id: id });
    return res.json(photo);
  }

  static async findByProduct(req: Request, res: Response) {
    const {product}  = req.params;

    const productId = Number(product);

    if (!productId) {
      return res.status(400).json({ error: "O código produto é obrigatório" });
    }

    const photo = await Photo.getRepository()
          .createQueryBuilder()
          .select()
          .where("photo.productId = :productId",{productId})
          .getMany()
    if(photo.length == 0){
      return res.status(200).json({ message: "Nenhum registro encontrado" });
    }
    return res.json(photo);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    const photo = await Photo.findOneBy({ id: id });
    if (!photo) {
      return res.status(404).json({ error: "Foto não encontrada" });
    }

    await photo.remove();
    return res.status(204).json();
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      photo_path,
      product
    } = req.body;

    const photo = await Photo.findOneBy({ id: id });

    if (!photo) {
      return res.status(404).json({ error: "Foto não encontrada" });
    }

      if (photo_path) {
      photo.photo_path = photo_path;
    }

    if (product) {
      const productFind = await Product.findOneBy({id: product})
      
      if(!productFind || productFind == undefined){
        return  res.status(400).json({error: "Produto inexistente"})
      }

      photo.product = product;
    }  

    await photo.save();

    return res.status(201).json(photo);
  }
  

}

