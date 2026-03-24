import { Router } from 'express';
import { BudgetController } from '../controllers/BudgetController';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { validateBudgetExists, validateBudgetId, validateBudgetInputs } from '../middleware/budget';

const router = Router()

// cada ruta que use el 'id' se ejecuta el middleware
// router.param('budgetId', validateBudgetId)
// router.param('budgetId', validateBudgetExists)

router.get('/', BudgetController.getAll)

router.post('/', 
  validateBudgetInputs,
  BudgetController.create
)

router.get('/:budgetId',
  param('budgetId')
    .isInt().withMessage('ID no válido')
    .custom(value => value > 0).withMessage('ID no válido'),
  handleInputErrors,
  BudgetController.getById
)

router.put('/:budgetId',
  param('budgetId')
    .isInt().withMessage('ID no válido')
    .custom(value => value > 0).withMessage('ID no válido'),
  body('name')
    .notEmpty().withMessage('El nombre del presupuesto no puede ir vacio'),
  body('amount')
    .notEmpty().withMessage('La cantidad del presupuesto no puede ir vacia')
    .isNumeric().withMessage('Cantidad no valida')
    .custom(value => value > 0).withMessage('El presupuesto debe ser mayor a 0'),
  handleInputErrors,
  BudgetController.updateById
)

router.delete('/:budgetId',
  validateBudgetId,
  validateBudgetExists,
  BudgetController.deleteById
)

export default router