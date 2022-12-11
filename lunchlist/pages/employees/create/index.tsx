import type { NextPage } from 'next'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Rules from './../../../components/Rules'

const EmployeeCreate: NextPage = () => {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: 'Ola',
      rules: 'Days:',
    },
  })

  const onSubmit = async (data) => {
    const name = data.name
    const rules = data.rules
    console.log(data.name)
    try {
      const body = { name, rules }
      await fetch(`/api/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setSent(true)
      resetField('name')
      resetField('rules')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <header className=" bg-white rounded   p-10 px-10  flex flex-col justify-between items-start ">
        <h1 className="text-3xl font-semibold mb-4">Lag ny bruker</h1>
        <form
          className="w-full flex flex-col gap-2  items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex flex-row gap-2  items-center">
            <div className="w-full flex flex-col">
              <label className="mb-2 text-xl font-bold">Navn</label>
              <input
                {...register('name', { required: true, minLength: 4 })}
                className="px-3 bg-white border border-shade h-12  p-2 rounded mb-2"
                type="text"
              ></input>
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-xl font-bold">Regler*</label>
              <input
                {...register('rules', { required: true, minLength: 5 })}
                className="px-3 bg-white border border-shade h-12  p-2 rounded mb-2"
                type="text"
              ></input>
            </div>
          </div>
          {sent && (
            <p
              className="p-2 font-semibold self-start"
              id="formSuccess"
              data-testid="form_success"
            >
              Bruker er opprettet!
            </p>
          )}
          {errors.name && (
            <p className="p-2 text-red font-semibold self-start">
              Du må skrive et navn på over to bokstaver.
            </p>
          )}

          {errors.rules && (
            <p className="p-2 text-red font-semibold self-start">
              Du må ha med days: + en regel*
            </p>
          )}
          <button
            type="submit"
            className="transition self-start ease-in-out delay-75  bg-dark text-white p-2 h-12 rounded px-6  hover:opacity-70 "
          >
            Opprett bruker
          </button>
        </form>
      </header>

      {/* Regler */}
      <Rules />
    </>
  )
}
export default EmployeeCreate
