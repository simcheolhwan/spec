import React from 'react'
import { reduxForm } from 'redux-form'
import { sanitize } from '../helpers/utils'
import Form from '../components/Form'

const fields = {
  Email: { type: 'email' },
  Password: { type: 'password' }
}

const validate = values => {
  const errors = {}
  const { email, password } = sanitize(values)
  errors.email = !email && 'Required'
  errors.password = !password && 'Required'
  return errors
}

const SigninForm = props => <Form {...props} fields={fields} />

export default reduxForm({ form: 'Signin', validate })(SigninForm)
