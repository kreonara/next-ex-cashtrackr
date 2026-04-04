"use server"

import getToken from "@/src/auth/token"
import { Budget, ErrorResponseSchema, PasswordValidationSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

interface Props {
  errors: string[]
  success: string
}

export async function deleteBudget(budgetId: Budget['id'], prevState: Props, formData: FormData) {
  const currentPassword = PasswordValidationSchema.safeParse(formData.get('password'))
  if(!currentPassword.success) {
    return {
      errors: currentPassword.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  // comprobar password con nuestro backend
  const token = await getToken()
  const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`
  const checkPasswordResp = await fetch(checkPasswordUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: currentPassword.data
    })
  })

  const checkPasswordData = await checkPasswordResp.json()
  if(!checkPasswordResp.ok) {
    const { error } = ErrorResponseSchema.parse(checkPasswordData)
    return {
      errors: [error],
      success: ''
    }
  }

  // si paso las validaciones eliminamos el presupuesto
  const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`
  const deleteBudgetResp = await fetch(deleteBudgetUrl, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const deleteBudgetData = await deleteBudgetResp.json()
  if(!deleteBudgetResp.ok) {
    const { error } = ErrorResponseSchema.parse(deleteBudgetData)
    return {
      errors: [error],
      success: ''
    }
  }
  
  // revalidatePath('/admin')

  const success = SuccessSchema.parse(deleteBudgetData)

  return {
    errors: [],
    success
  }
}