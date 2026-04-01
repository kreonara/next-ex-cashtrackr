import "server-only"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { UserSchema } from "../schemas"
import { cache } from "react"

// Data Access Layer
export const verifySession = cache(async() => {
  const token = (await cookies()).get('CASHTRACKR_TOKEN')?.value
  if(!token) {
    redirect('auth/login')
  }

  // validar, verificar el JWT
  const url = `${process.env.API_URL}/auth/user`
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const session = await resp.json()
  const result = UserSchema.safeParse(session)

  if(!result.success) {
    redirect('/auth/login')
  }

  return {
    user: result.data,
    isAuth: true
  }
})