import { verifySession } from "@/src/auth/dal"
import getToken from "@/src/auth/token"

interface Props {
  params: Promise<{budgetId: string, expenseId: string}>
}

// http://localhost:3000/admin/api/budgets/10/expenses/20
export async function GET(req: Request, { params }: Props) {
  await verifySession() // verificamos el JWT exista en las cookies

  const { budgetId, expenseId } = await params
  console.log(budgetId)
  console.log(expenseId)

  const token = await getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
  const resp = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const data = await resp.json()

  if(!resp.ok) {
    return Response.json(data.error, {status: 403})
  }

  return Response.json(data)
}