"use server"

import getToken from "@/src/auth/token"
import { ErrorResponseSchema, SuccessSchema, UpdatePasswordSchema } from "@/src/schemas"

interface Props {
  errors: string[]
  success: string
}

export async function updatePassword(prevState: Props, formData: FormData) {
  const userPassword = UpdatePasswordSchema.safeParse({
    current_password: formData.get('current_password'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation')
  })

  if(!userPassword.success) {
    return {
      errors: userPassword.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  const token = await getToken()
  const url = `${process.env.API_URL}/auth/update-password`
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      current_password: userPassword.data.current_password,
      password: userPassword.data.password
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

  return {
    errors: [],
    success
  }
}