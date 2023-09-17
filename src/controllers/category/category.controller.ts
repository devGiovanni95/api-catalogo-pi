import { Request, Response } from 'express'
import Category from '../../models/category'
import { Timestamp } from 'typeorm'

export default class CategoryController {

  static async store (req: Request, res: Response) {
    const { name, description } = req.body

    if (!name) {
      return res.status(400).json({ error: 'O nome é obrigatório' })
    }

    if (!description) {
      return res.status(400).json({ error: 'A descrição é obrigatória' })
    }

    const category = new Category()
    category.name = name
    category.description = description
    const data = new Date();
    category.created_at = data
    
    await category.save()

    return res.status(201).json(category)
  }


  static async findAll (req: Request, res: Response) {
      const  listCategories = await Category.find()
      return res.json(listCategories)
  }


  static async findById (req: Request, res: Response) {
    const { id } = req.params

    if(!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    const category = await Category.findOneBy({id: Number(id)})
    return res.json(category)
}


static async delete (req: Request, res: Response) {
  const { id } = req.params

  if(!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'O id é obrigatório' })
  }

  const category = await Category.findOneBy({id: Number(id)})
  if (!category) {
    return res.status(404).json({ error: 'Categoria não encontrada' })
  }

  await category.remove()
  return res.status(204).json()
}

static async update (req: Request, res: Response) {
  const { id } = req.params
  const { name, description } = req.body

  if(!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'O id é obrigatório' })
  }

  const category = await Category.findOneBy({id: Number(id)})
  if (!category) {
    return res.status(404).json({ error: 'Categoria não encontrada' })
  }

  category.name = name
  category.description = description
  const data = new Date();
  category.updated_at = data

  await category.save()
  return res.json(category)
  }
  
}