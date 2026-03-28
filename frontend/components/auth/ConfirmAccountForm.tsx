"use client"

import { confirmAccount } from "@/actions/confirm-account.action"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { startTransition, useActionState, useEffect, useState } from "react"
import ErrorMessage from "../ui/ErrorMessage"
import SuccessMessage from "../ui/SuccessMessage"

const ConfirmAccountForm = () => {
  const [isComplete, setIsComplete] = useState(false)
  const [token, setToken] = useState("")
  
  const [state, action] = useActionState(confirmAccount, {
    errors: [],
    success: ''
  })
  
  useEffect(() => {
    if(isComplete) {
      // startTransition le dice a React: esto puede tardar, no bloquees la UI
      // obligatorio cuando se llama un serverAction fuera de un <form>
      /**
        <button
          onClick={() => startTransition(() => action(token))}
          disabled={state.isPending} // useActionState agrega isPending al state automaticamete [true|false]
        >
          {state.isPending ? "Verificando..." : "Confirmar"}
        </button>
       */
      startTransition(() => action(token))
    }
  }, [isComplete])

  const handleChange = (token: string) => {
    setToken(token)
  }

  const handleComplete = () => {
    setIsComplete(true)
  }

  return (
    <>
      {state.errors.map(error => <ErrorMessage>{error}</ErrorMessage>)}
      {state.success && <SuccessMessage>{state.success}</SuccessMessage>}

      <div className="flex justify-center gap-5 my-10">
        <PinInput
          value={token}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white" />
        </PinInput>
      </div>
    </>
  )
}

export default ConfirmAccountForm