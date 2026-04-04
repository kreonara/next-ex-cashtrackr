"use server"

import getToken from "@/src/auth/token"
import { Budget, DraftBudgetSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

interface Props {
  errors: string[],
  success: string
}

export async function editBudget(budgetId: Budget['id'], prevState: Props, formData: FormData) {
  const budgetData = {
    name: formData.get('name'),
    amount: formData.get('amount')
  }
  const budget = DraftBudgetSchema.safeParse(budgetData)
  if(!budget.success) {
    return {
      errors: budget.error.issues.map(issue => issue.message),
      success: ''
    }
  }
  
  const token = await getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}`
  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount
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

  // actualizamos el path para que no lea del cache
  // revalidatePath('/admin') // refetch de todo
  // revalidateTag('/all-budget) // refetch solo a cierta peticion / tag

  const success = SuccessSchema.parse(data)

  return {
    errors: [],
    success
  }
}