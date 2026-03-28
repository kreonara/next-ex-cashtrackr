"use client"

import { ActionStateType, register } from "@/actions/create-account.action"
import { useActionState, useEffect, useRef } from "react"
import ErrorMessage from "../ui/ErrorMessage"
import SuccessMessage from "../ui/SuccessMessage"

const initialValues: ActionStateType = {
  errors: [],
  success: "",
  values: {
    email: "",
    name: "",
    password: "",
    password_confirmation: ""
  }
}

const RegisterForm = () => {
  // const ref = useRef<HTMLFormElement>(null)
  const [ state, action ] = useActionState(register, initialValues)

  // useEffect(() => {
  //   if(state.success) {
  //     ref.current?.reset()
  //   }
  // }, [state])
  

  return (
    <form
      // ref={ref}
      action={action}
      className="mt-14 space-y-5"
      noValidate
    >
      {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
      {state.success && <SuccessMessage>{state.success}</SuccessMessage>}

      <div className="flex flex-col gap-2">
        <label
          className="font-bold text-2xl"
          htmlFor="email"
        >Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="email"
          defaultValue={state.values.email}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="font-bold text-2xl"
        >Nombre</label>
        <input
          type="name"
          placeholder="Nombre de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="name"
          defaultValue={state.values.name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="font-bold text-2xl"
        >Password</label>
        <input
          type="password"
          placeholder="Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password"
          defaultValue={state.values.password}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="font-bold text-2xl"
        >Repetir Password</label>
        <input
          id="password_confirmation"
          type="password"
          placeholder="Repite Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password_confirmation"
          defaultValue={state.values.password_confirmation}
        />
      </div>

      <input
        type="submit"
        value='Registrarme'
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  )
}

export default RegisterForm