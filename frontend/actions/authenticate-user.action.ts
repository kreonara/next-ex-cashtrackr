"use server"

import { ErrorResponseSchema, LoginSchema } from "@/src/schemas"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type ActionStateType = {
  errors: string[]
}

export async function authenticate(prevState: ActionStateType, formData: FormData) {
  const loginCredentials = {
    email: formData.get('email') ?? '',
    password: formData.get('password') ?? ''
  }

  // validamos la estructura con Zod
  const auth = LoginSchema.safeParse(loginCredentials)
  if(!auth.success) {
    return {
      errors: auth.error.issues.map(issue => issue.message)
    }
  }

  const url = `${process.env.API_URL}/auth/login`
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: auth.data.password,
      email: auth.data.email
    })
  })

  const data = await resp.json()

  if(!resp.ok) {
    const { error } = ErrorResponseSchema.parse(data)
    return {
      errors: [error]
    }
  }

  // Setear Cookies
  (await cookies()).set({
    name: 'CASHTRACKR_TOKEN',
    value: data,
    httpOnly: true, // unicamente código de servidor accede a esta cookie
    path: '/' // cookie valida en todo el sitio '/' puede ser solo admin: '/admin'
  })

  redirect('/admin')

  // return {
  //   errors: []
  // }
}