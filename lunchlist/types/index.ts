export type Data = { status: true; data: Record<string, unknown> }
export type Error = { status: false; error: string }

export type Result = Data | Error

export type Employee = {
  name: string
  rules?: string
}

export type UpdateEmployeeName = {
  name: string
  id: string
}

export type UpdateEmployeeWorking = {
  dayId: string
  employeeId: number
}

export type dayIdType = {
  dayId: string
}

export type employeeIdType = {
  employeeId: string
}

export type IdQuery = {
  id: string
}

export type IdQueryList = {
  idList: number[]
}

export type Id = {
  id: string
}

export type EmployeeListType = {
  id: number
  name: string
  rules: string
}
