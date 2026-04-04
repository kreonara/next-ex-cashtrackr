"use server"

import getToken from "@/src/auth/token"
import { DraftBudgetSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

interface Props {
  errors: string[],
  success: string
}

export async function createBudget(prevState: Props, formData: FormData) {

  const budget = DraftBudgetSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount')
  })
  if (!budget.success) {
    return {
      errors: budget.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  const token = (await cookies()).get('CASHTRACKR_TOKEN')?.value
  const url = `${process.env.API_URL}/budgets`
  const resp = await fetch(url, {
    method: 'POST',
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

  // revalidatePath('/admin')

  const success = SuccessSchema.parse(data)

  return {
    errors: [],
    success
  }

}