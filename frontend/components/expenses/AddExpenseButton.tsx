"use client"

import { useRouter } from "next/navigation"

const AddExpenseButton = () => {
  const router = useRouter()

  return (
    <button
      // onClick={() => router.push('?addExpense=true&showModal=true')}
      onClick={() => router.push(location.pathname + '?addExpense=true&showModal=true')} // lo mismo que arriba
      type="button"
      className="bg-amber-500 px-10 py-2 rounded-lg text-white font-bold cursor-pointer"
    >
      Agregar Gasto
    </button>
  )
}

export default AddExpenseButton