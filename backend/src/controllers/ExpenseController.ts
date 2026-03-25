import type { Request, Response } from 'express'
import Expense from '../models/Expense'

export class ExpensesController {

  static create = async (req: Request, res: Response) => {
    // console.log(req.budget.id) <- ASI
    // console.log(req.params.budgetId)
    try {
      const { budgetId } = req.params
      const expense = new Expense(req.body)
      expense.budgetId = +budgetId
      await expense.save()
      console.log('llegué')
      res.status(201).json('Gasto Agregado Correctamente')
    } catch (error) {
      console.log(error)
      res.status(500).json('Hubo un error')
    }
  }

  static getById = async (req: Request, res: Response) => {
    res.json(req.expense)
  }

  static updateById = async (req: Request, res: Response) => {
    await req.expense.update(req.body)
    res.json('Gasto Actualizado Correctamente')
  }

  static deleteById = async (req: Request, res: Response) => {
    await req.expense.destroy()
    res.json('Gasto eliminado correctamente')
  }
}