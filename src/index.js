import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Raven from 'raven-js'
import store from './store'
import App from './components/App/App'
import './styles/reboot.css'

const DSN = 'https://2c17e6f9c90d4851be04f44168548d7b@sentry.io/227287'
process.env.REACT_APP_ENV === 'production' && Raven.config(DSN).install()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
