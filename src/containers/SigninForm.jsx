import React from 'react'
import { reduxForm } from 'redux-form'
import Form from '../components/Form'

const fields = {
  Email: { type: 'email' },
  Password: { type: 'password' }
}

const validate = ({ email = '', password = '' }) => {
  const errors = {}
  errors.email = !email.trim() && 'Required'
  errors.password = !password && 'Required'
  return errors
}

const SigninForm = props => <Form {...props} fields={fields} />

export default reduxForm({ form: 'Signin', validate })(SigninForm)
