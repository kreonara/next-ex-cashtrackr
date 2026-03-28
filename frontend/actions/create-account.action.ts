"use server"

import { ErrorResponseSchema, RegisterSchema, SuccessSchema } from "@/src/schemas"

export type ActionStateType = {
  errors: string[]
  success: string
  values: {
    email: string,
    name: string,
    password: string,
    password_confirmation: string
  }
}

const emptyValues = {
  email: '',
  name: '',
  password: '',
  password_confirmation: ''
}

// prevState es lo que le pasamos como initialState (state) desde useActionState: errors: []
export async function register(prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {
  const registerData = {
    email: (formData.get('email') ?? '') as string,
    name: (formData.get('name') ?? '') as string,
    password: (formData.get('password') ?? '') as string,
    password_confirmation: (formData.get('password_confirmation') ?? '') as string
  }

  // validar
  const register = RegisterSchema.safeParse(registerData)
  // console.log(register)
  if(!register.success) {
    const errors = register.error.issues.map(error => error.message)
    // console.log(errors)
    return {
      errors,
      success: prevState.success,
      values: registerData
    }
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

  if(req.status === 409) {
    const error = ErrorResponseSchema.parse(response)
    
    return {
      errors: [error.error],
      success: '',
      values: registerData
    }
  }

  const success = SuccessSchema.parse(response) // con parse, pasa directo el valor del message

  return {
    errors: [],
    success,
    values: emptyValues
  }
}