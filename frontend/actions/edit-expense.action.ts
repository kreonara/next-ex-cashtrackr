"use server"

import getToken from "@/src/auth/token"
import { Budget, DraftExpenseSchema, ErrorResponseSchema, Expense, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

interface Props {
  errors: string[],
  success: string
}

interface ArgsProps {
  budgetId: Budget['id']
  expenseId: Expense['id']
}

export default async function editExpense(
  { budgetId, expenseId }: ArgsProps,
  prevState: Props, 
  formData: FormData,
) {

  const expense = DraftExpenseSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount')
  })
  if(!expense.success) {
    return {
      errors: expense.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  // Actualizar el Gasto
  const token = await getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount
    })
  })

  const data = await resp.json()
  if(!resp.ok) {
    const { error } = ErrorResponseSchema.parse(data)

    return {
      errors: [error],
      success: ''
    }
  }

  const success = SuccessSchema.parse(data)

  // revalidatePath(`/admin/budgets/${budgetId}`)
  
  return {
    errors: [],
    success
  }
}