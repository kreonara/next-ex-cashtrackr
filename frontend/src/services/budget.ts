import { cache } from "react"
import getToken from "../auth/token"
import { notFound } from "next/navigation"
import { BudgetAPIResponseSchema } from "../schemas"

export const getBudget = cache(async (budgetId: string) => {
  const token = await getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}`
  const resp = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const data = await resp.json()

  if (!resp.ok) {
    notFound()
  }

  const budget = BudgetAPIResponseSchema.parse(data)
  return budget
})