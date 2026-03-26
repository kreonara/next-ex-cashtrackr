import type { Request, Response } from 'express';
import Budget from '../models/Budget';
import Expense from '../models/Expense';

export class BudgetController {

  static getAll = async(req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        order: [
          ['createdAt', 'DESC']
        ],
        // limit: 2,
        // Filtrar por el usuario autenticado
        where: {
          userId: req.user.id
        }
      })

      res.jsonp(budgets)
    } catch (error) {
      // console.log(error)
      res.status(500).json({error: 'Ocurrió un Error'})
    }
  }
  
  static create = async(req: Request, res: Response) => {
    try {
      const budget = new Budget(req.body)
      budget.userId = req.user.id
      await budget.save()
      res.status(201).json('Presupuesto Creado Correctamente')
    } catch (error) {
      // console.log(error)
      res.status(500).json({error: 'Ocurrió un Error'})
    }
  }
  
  static getById = async(req: Request, res: Response) => {
    try {
      const { budgetId } = req.params
      const budget = await Budget.findByPk(+budgetId, {
        include: [Expense]
      })
      if(!budget || req.budget.userId !== req.user.id) {
        const error = new Error('Presupuesto no encontrado')
        return res.status(404).json({error: error.message})
      }

      res.json(budget)
    } catch (error) {
      // console.log(error)
      res.status(500).json({error: 'Ocurrió un Error'})
    }
  }
  
  static updateById = async(req: Request, res: Response) => {
    try {
      const { budgetId } = req.params
      const budget = await Budget.findByPk(+budgetId)
      if(!budget || req.budget.userId !== req.user.id) {
        const error = new Error('Presupuesto no encontrado')
        return res.status(404).json({error: error.message})
      }

      // Escribir los cambios del body
      await budget.update(req.body)
      res.json('Presupuesto actualizado correctamente')
    } catch (error) {
      // console.log(error)
      res.status(500).json({error: 'Ocurrió un Error'})
    }
  }
  
  static deleteById = async(req: Request, res: Response) => {
    await req.budget.destroy()
    res.json('Presupuesto eliminado correctamente')
  }
}