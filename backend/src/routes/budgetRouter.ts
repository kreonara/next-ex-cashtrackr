import { Router } from 'express';
import { BudgetController } from '../controllers/BudgetController';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { hasAccess, validateBudgetExists, validateBudgetId, validateBudgetInputs } from '../middleware/budget';
import { ExpensesController } from '../controllers/ExpenseController';
import { belongsToBudget, validateExpenseExists, validateExpenseId, validateExpenseInputs } from '../middleware/expense';
import { authenticate } from '../middleware/auth';

const router = Router()

// cada ruta que use el 'id' se ejecuta el middleware
// router.param('budgetId', validateBudgetId)
// router.param('budgetId', validateBudgetExists)

router.use(authenticate) // req.user

// router.param('expenseId', validateExpenseId)
// router.param('expenseId', validateExpenseExists) // req.budget
// router.param('expenseId', hasAccess)
// router.param('expenseId', belongsToBudget)

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


/** Routes for expenses */

router.post('/:budgetId/expenses',
  validateExpenseInputs,
  handleInputErrors,
  ExpensesController.create
)

// se valida en la linea 18
router.get('/:budgetId/expenses/:expenseId', 
  validateBudgetId,
  validateBudgetExists,
  validateExpenseId,
  validateExpenseExists,
  hasAccess,
  ExpensesController.getById
)

router.put('/:budgetId/expenses/:expenseId',
  validateBudgetId,
  validateBudgetExists,
  validateExpenseId,
  validateExpenseExists,
  hasAccess,
  validateExpenseInputs,
  handleInputErrors,
  ExpensesController.updateById
)

router.delete('/:budgetId/expenses/:expenseId',
  validateBudgetId,
  validateBudgetExists,
  validateExpenseId,
  validateExpenseExists,
  belongsToBudget,
  handleInputErrors,
  ExpensesController.deleteById
)


export default router