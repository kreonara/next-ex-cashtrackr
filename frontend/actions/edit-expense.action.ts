"use server"

import { Budget, Expense } from "@/src/schemas"

interface Props {
  errors: string[],
  success: string
}

interface ArgsProps {
  budgetId: Budget['id']
  expenseId: Expense['id']
}

export default async function editExpense(
  { budgetId, expenseId }: ArgsProps,
  prevState: Props, 
  formData: FormData,
) {

  console.log(budgetId)
  console.log(expenseId)
  
  return {
    errors: [],
    success: ''
  }
}