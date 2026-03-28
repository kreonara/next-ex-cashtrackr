"use server"

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas"
import { success } from "zod"

type ActionStateTypes = {
  errors: string[],
  success: string
}

export async function confirmAccount(prevState: ActionStateTypes, token: string) {
  const confirmToken = TokenSchema.safeParse(token)
  if(!confirmToken.success) { // confirmToken.data -> token
    return {
      errors: confirmToken.error.issues.map(error => error.message),
      success: ''
    }
  }

  // Confirmar usuario en Express
  const url = `${process.env.API_URL}/auth/confirm-account`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: confirmToken.data
    })
  })

  const data = await response.json()
  // console.log(response.ok)
  // console.log(data)
  if(!response.ok) {
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