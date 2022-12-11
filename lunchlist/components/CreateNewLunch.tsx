import { useState, useEffect } from 'react'
import { EmployeeListType } from '../types'

const CreateNewLunch = () => {
  const [employees, setEmployees] = useState<any[]>([])
  const [monthState, setMonthState] = useState<any[]>([])

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await fetch('/api/employees/')
        const data = await response.json()
        setEmployees(data?.data)
      } catch (error) {
        console.log(error)
      }
    }
    getEmployee()
  }, [])

  const options = {
    vacations: [8, 28, 29, 30, 31, 32, 40, 52], // Uker hvor det er ferie, ingen har lunsj
    yearSize: 52, // Antall uker (i tilfelle det genereres kun 20 uker kan denne endres)
    workDays: 5, // Antall dager i en uke (i tilfelle man vil bare benytte 4 dagersuke kan denne endres)
    batchSize: 4, // Brukes for å lage 4 og 4 uker. Uke 1-4, 5-9, 10-14 etc. Relevant for en del av reglene som tar utgangspunkt i 4 og 4 uker.
    maxOccurrences: 2, // Kan brukes til å styrer hvor mange dager en ansatt kan dukke opp på samme dag i løpet av batch på 4 uker
    days: [
      'Mandag',
      'Tirsdag',
      'Onsdag',
      'Torsdag',
      'Fredag',
      'Lørdag',
      'Søndag',
    ],
  }

  let generatedDays = 0 // Denne skal gå fra 0-4. Når den blir 4 så har det blitt generert lunch for 5 dager/ 1 uke
  let generatedWeeks = 0 // Denne skal gå fra 0-4. Når den blir 4 så har det blitt generert lunch for 4 uker / 1 måned

  const generateRandomEmployee = (possibleEmployeeList: any) => {
    const randomNumber = Math.round(
      Math.random() * (possibleEmployeeList.length - 1)
    ) // random number from 0 - possibleEmployeeList.length
    return possibleEmployeeList[randomNumber]
  }

  const generateLunchWeek = (employeesList: any) => {
    let lunchWeek: EmployeeListType[] = []
    let randomEmployee: any
    let possibleEmployeeList = employeesList

    for (let i = 0; i < 5; i++) {
      //   randomE?.rules?.includes(`${generatedDays + 1}`) &&
      let allDaysRules = possibleEmployeeList.filter((employee) =>
        employee.rules.includes(`*`)
      )

      let daysRules = possibleEmployeeList.filter(
        (employee) =>
          employee.rules.includes(`days`) &&
          employee.rules.includes(`${generatedDays + 1}`)
      )

      // concat all the rules to a possibleEmployeeList
      possibleEmployeeList = [...allDaysRules, ...daysRules]

      randomEmployee = generateRandomEmployee(possibleEmployeeList)
      // console.log(possibleEmployeeList)
      lunchWeek.push(randomEmployee)

      // removing random generated employee from the possibleEmployeeList
      // this makes it so the same employee doesnt work more than once a week.
      possibleEmployeeList = possibleEmployeeList.filter(
        (employee) => employee !== lunchWeek[i]
      )
      // console.log(possibleEmployeeList)

      generatedDays += 1
    }
    generatedWeeks += 1
    return lunchWeek
  }

  const handleCreateNewLunchBatch = () => {
    let possibleEmployeeList

    // NOTE: UKE 1 starter her
    // resetter possibleEmployeeList
    possibleEmployeeList = employees
    // filtrere vekk ansatte som kun kan jobbe partall før uke 1
    for (let i = 0; i < employees.length; i++) {
      possibleEmployeeList = possibleEmployeeList.filter(
        (employees) => !employees.rules.includes('even')
      )
    }

    // filtrere vekk hun bitcha Josephine som bare kan jobbe i uke 3
    for (let i = 0; i < employees.length; i++) {
      possibleEmployeeList = possibleEmployeeList.filter(
        (employees) => !employees.rules.includes('week:3')
      )
    }
    let week1 = generateLunchWeek(possibleEmployeeList)

    // TODO: UKE 2 starter her
    // resetter possibleEmployeeList
    possibleEmployeeList = employees
    // filtrere vekk forrige ukes ansatte slik at de 10 andre ansatte blir prioritert
    for (let i = 0; i < week1.length; i++) {
      possibleEmployeeList = possibleEmployeeList.filter(
        (employees) => employees !== week1[i]
      )
    }
    // filtrere vekk hun bitcha Josephine som bare kan jobbe i uke 3
    for (let i = 0; i < employees.length; i++) {
      possibleEmployeeList = possibleEmployeeList.filter(
        (employees) => !employees.rules.includes('week:3')
      )
    }
    // filtrere vekk ansatte som kun kan jobbe oddetall før uke 2
    for (let i = 0; i < employees.length; i++) {
      possibleEmployeeList = possibleEmployeeList.filter(
        (employees) => !employees.rules.includes('odd')
      )
    }

    let week2 = generateLunchWeek(possibleEmployeeList)

    // TODO: UKE 3 starter her
    // resetter possibleEmployeeList
    possibleEmployeeList = employees
    // filtrere vekk forrige ukes ansatte slik at de 10 andre ansatte blir prioritert
    for (let i = 0; i < week2.length + 1; i++) {
      possibleEmployeeList = possibleEmployeeList.filter(
        (employees) => employees !== week2[i]
      )
    }
    // filtrere vekk ansatte som kun kan jobbe partall før uke 3
    for (let i = 0; i < employees.length; i++) {
      possibleEmployeeList = possibleEmployeeList.filter(
        (employees) => !employees.rules.includes('even')
      )
    }
    let week3 = generateLunchWeek(possibleEmployeeList)

    // TODO: UKE 4 starter her
    // resetter possibleEmployeeList
    possibleEmployeeList = employees
    // filtrere vekk forrige ukes ansatte slik at de 10 andre ansatte blir prioritert
    for (let i = 0; i < week3.length + 1; i++) {
      possibleEmployeeList = possibleEmployeeList.filter(
        (employees) => employees !== week3[i]
      )
    }
    // filtrere vekk hun bitcha Josephine som bare kan jobbe i uke 3
    for (let i = 0; i < employees.length; i++) {
      possibleEmployeeList = possibleEmployeeList.filter(
        (employees) => !employees.rules.includes('week:3')
      )
    }
    // filtrere vekk ansatte som kun kan jobbe oddetall før uke 4
    for (let i = 0; i < employees.length; i++) {
      possibleEmployeeList = possibleEmployeeList.filter(
        (employees) => !employees.rules.includes('odd')
      )
    }
    let week4 = generateLunchWeek(possibleEmployeeList)

    setMonthState([...week1, ...week2, ...week3, ...week4])
  }

  return (
    <>
      <button
        type="button"
        className=" bg-dark text-white p-2 h-12 rounded px-6  hover:opacity-70 "
        onClick={handleCreateNewLunchBatch}
      >
        Lag en lunchliste for 4 uker
      </button>
      {monthState && monthState.length > 0 ? (
        // <p>{JSON.stringify(lunchMonthGenerated)}</p>
        monthState?.map((employee, index) => (
          <div key={index}>
            <p>{employee?.day}</p>
            <p>{JSON.stringify(employee)}</p>
          </div>
        ))
      ) : (
        <p>Trykk knappen for å lage en ny lunchliste</p>
      )}
    </>
  )
}

export default CreateNewLunch
