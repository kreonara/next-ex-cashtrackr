"use server"

import getToken from "@/src/auth/token"
import { Budget, ErrorResponseSchema, Expense, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

interface Props {
  errors: string[]
  success: string
}

interface PropsArgs {
  budgetId: Budget['id']
  expenseId: Expense['id']
}

export default async function deleteExpense({ budgetId, expenseId }: PropsArgs, prevState: Props) {
  const token = await getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
  const resp = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
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