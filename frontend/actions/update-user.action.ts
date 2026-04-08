"use server"

import getToken from "@/src/auth/token"
import { ErrorResponseSchema, ProfileFormSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

interface Props {
  errors: string[]
  success: string
}

export async function updateUser(prevData: Props, formData: FormData) {
  const profile = ProfileFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email')
  })
  if (!profile.success) {
    return {
      errors: profile.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  const token = await getToken()
  const url = `${process.env.API_URL}/auth/user`
  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: profile.data.name,
      email: profile.data.email
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

  revalidatePath('/admin/profile/settings')

  return {
    errors: [],
    success
  }
}