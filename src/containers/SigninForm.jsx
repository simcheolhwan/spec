import React from 'react'
import { reduxForm } from 'redux-form'
import Form from '../components/Form'

const fields = {
  Email: { type: 'email', autoFocus: true },
  Password: { type: 'password' }
}

const Signin = props => <Form {...props} fields={fields} />

export default reduxForm({ form: 'Signin' })(Signin)
