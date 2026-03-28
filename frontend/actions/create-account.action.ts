"use server"

import { RegisterSchema } from "@/src/schemas"

export async function register(formData: FormData) {
  const registerData = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    password_confirmation: formData.get('password')
  }

  // validar
  const register = RegisterSchema.safeParse(registerData)
  const errors = register.error?.issues.map(error => error.message)
  // console.log(errors)
  // console.log(register)
  if(!register.success) {
    return {}
  }

  // enviar peticion hacia express
  const url = `${process.env.API_URL}/auth/create-account`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: register.data.name,
      password: register.data.password,
      email: register.data.email
    })
  })

  const response = await req.json()
}