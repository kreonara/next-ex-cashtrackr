import { formatCurrency } from "@/src/utils"

interface Props {
  label: string
  amount: number
}

const Amount = ({ label, amount }: Props) => {
  return (
    <p className="text-2xl font-bold">
      {label}: {''}
      <span className="text-amber-500">{formatCurrency(amount)}</span>
    </p>
  )
}

export default Amount