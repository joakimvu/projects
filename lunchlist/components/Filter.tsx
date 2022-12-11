import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Filter = () => {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      from: 1,
      too: 52,
    },
  })
  const router = useRouter()

  const onSubmit = (data: any) => {
    if (data.from > data.too) {
      setSent(true)
    } else {
      router.push(`/weeks/${data.from}/${data.too}`)
      resetField('too')
      resetField('from')
      setSent(false)
    }
  } // your form submit function which will invoke after successful validation

  return (
    <div className="flex flex-col gap-x-3 items-center">
      <form
        className="flex gap-x-3 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>Fra</label>
        <input
          className="bg-white border border-shade h-12 w-12 p-2 rounded"
          {...register('from', { required: true, min: 1, max: 52 })}
        />
        <label>Til</label>
        <input
          className="bg-white border border-shade h-12 w-12 p-2 rounded"
          {...register('too', { required: true, min: 1, max: 52 })}
        />
        <button
          className="transition ease-in-out delay-75 cursor-pointer  bg-dark text-white p-2 h-12 rounded px-6  hover:opacity-70 "
          type="submit"
        >
          Filtrer
        </button>
      </form>
      <div>
        {sent && (
          <p
            className="p-2 text-red font-semibold self-start"
            id="formSuccess"
            data-testid="form_success"
          >
            Kan ikke ha høyere tall i første feltet!
          </p>
        )}
        {errors.too && (
          <p className="p-2 text-red font-semibold self-start">
            Du må skrive inn et tall mellom 1 - 52
          </p>
        )}
        {errors.from && (
          <p className="p-2 text-red font-semibold self-start">
            Du må skrive inn et tall mellom 1 - 52
          </p>
        )}
      </div>
    </div>
  )
}

export default Filter
