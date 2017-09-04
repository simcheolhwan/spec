import React from 'react'
import { reduxForm } from 'redux-form'
import { sanitize } from '../helpers/utils'
import Form from '../components/Form'

const fields = {
  Name: { type: 'string' },
  Slug: { type: 'string' }
}

const validate = values => {
  const errors = {}
  const { name, slug } = sanitize(values)
  errors.name = !name && 'Required'
  errors.slug = !slug && 'Required'
  return errors
}

const SettingsForm = props => <Form {...props} fields={fields} />

export default reduxForm({ form: 'Settings', validate })(SettingsForm)
