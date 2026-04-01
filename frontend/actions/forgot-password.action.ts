"use server"

import { ErrorResponseSchema, ForgotPasswordSchema, SuccessSchema } from '@/src/schemas';

type ActionStateType = {
  errors: string[]
  success: string
}
export async function forgotPassword(prevState: ActionStateType, formData: FormData) {
  const forgotPassword = ForgotPasswordSchema.safeParse({
    email: formData.get('email')
  })

  if(!forgotPassword.success) {
    return {
      errors: forgotPassword.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  const url = `${process.env.API_URL}/auth/forgot-password`
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: forgotPassword.data.email
    })
  })

  const data = await resp.json()

  if(!resp.ok) {
    const result = ErrorResponseSchema.parse(data)
    return {
      errors: [result.error],
      success: ''
    }
  }

  const success = SuccessSchema.parse(data)

  return {
    errors: [],
    success
  }
}