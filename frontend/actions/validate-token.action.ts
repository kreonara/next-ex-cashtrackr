"use server"

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas"

type ActionStateType = {
  errors: string[]
  success: string
}

export async function validateToken(prevState: ActionStateType, token: string) {
  const resetPasswordToken = TokenSchema.safeParse(token)
  if(!resetPasswordToken.success) {
    return {
      errors: resetPasswordToken.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  const url = `${process.env.API_URL}/auth/validate-token`
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: resetPasswordToken.data})
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
  
  return {
    errors: [],
    success
  }
}