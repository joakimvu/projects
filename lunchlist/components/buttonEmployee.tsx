import { dayIdType, employeeIdType } from '../types'

const Button = ({
  handleChangeEmployee,
  dayId,
  employeeId,
}: {
  handleChangeEmployee: any
  dayId: dayIdType
  employeeId: employeeIdType
}) => {
  return (
    <button
      type="button"
      className="transition ease-in-out delay-75  bg-dark text-white p-2 h-12 rounded px-6 hover:opacity-70 ml-4 "
      onClick={() => handleChangeEmployee(dayId, employeeId)}
    >
      Endre ansatt
    </button>
  )
}

export default Button
