import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../lib/services/userService'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  // RESSURS
  // Redirect etter delay
  // https://dev.to/salehmubashar/how-to-use-react-history-in-react-js-8dl
  // https://stackoverflow.com/questions/62082869/uncaught-typeerror-history-push-is-not-a-function-error-occurs

  const navigate = useNavigate()

  const handleName = (event) => {
    setName(event.currentTarget.value)
  }
  const handleEmail = (event) => {
    setEmail(event.currentTarget.value)
  }

  // Tar imot data Som blir sendt fra innlogginssiden
  const onClick = async (data) => {
    // Bruker try/catch for å fange opp feil
    try {
      // kaller servicen med data
      await createUser(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name === '' || email === '') {
      document.getElementById('formError').innerHTML =
        'Fyll ut alle felter med *'
    } else {
      document.getElementById('formError').innerHTML = ''
      onClick({ name, email })
      setSent({ showMessage: true })
      setTimeout(() => navigate('kurs'), 500)
    }
  }

  return (
    <section id="signUp" data-testid="sign_up">
      <h2 data-testid="title">Ny bruker</h2>
      <form data-testid="form" noValidate method="POST">
        <label htmlFor="name" id="nameWrap">
          <span>Navn*</span>
          <input
            data-testid="form_name"
            type="text"
            name="name"
            id="name"
            onChange={handleName}
          />
        </label>
        <label htmlFor="email" id="emailWrap">
          <span>Epost*</span>
          <input
            data-testid="form_email"
            type="email"
            name="email"
            id="email"
            onChange={handleEmail}
          />
        </label>
        <label htmlFor="admin" id="adminWrap">
          <input
            data-testid="form_admin"
            type="checkbox"
            name="admin"
            id="admin"
          />
          <span>Admin</span>
        </label>

        <Link to="/kurs" onClick={handleSubmit}>
          <button data-testid="form_submit" type="submit">
            Lag ny bruker
          </button>
        </Link>

        {/* TODO: Bruk ved error */}
        <p id="formError" data-testid="form_error" />
        {/* {name === '' || email === '' ? (
          <p id="formError" data-testid="form_error">Fyll ut alle felter med *</p>
        ) : (
          <p data-testid="form_error" />
        )} */}
        {/* <p data-testid="form_error">Fyll ut alle felter med *</p> */}
        {/* TODO: Bruk ved suksess */}
        {sent.showMessage && (
          <p id="formSuccess" data-testid="form_success">
            Skjema sendt
          </p>
        )}
      </form>
    </section>
  )
}
