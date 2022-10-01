import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './styles/scss/main.scss'

import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
)
