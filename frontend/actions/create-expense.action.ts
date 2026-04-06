"use server"

import getToken from "@/src/auth/token"
import { DraftExpenseSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

interface Props {
  errors: string[]
  success: string
}

export default async function createExpense(budgetId: number, prevState: Props, formData: FormData) {
  const expenseData = {
    name: formData.get('name'),
    amount: formData.get('amount')
  }
  const expense = DraftExpenseSchema.safeParse(expenseData)
  if(!expense.success) {
    return {
      errors: expense.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  // si todo es correcto, generamos el gasto (enviamos la petición)
  const token = await getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`
  const resp = await fetch(url, {
    method: 'POST',
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