import React from 'react'
import { reduxForm } from 'redux-form'
import { slugify } from 'utils'
import Form from 'Form'

const fields = {
  Name: { type: 'string' },
  Slug: { type: 'string' }
}

const validate = ({ name = '', slug = '' }) => {
  const errors = {}
  errors.name = !name.trim() && 'Required'
  errors.slug = !slugify(slug) && 'Required'
  return errors
}

const SettingsForm = props => <Form {...props} fields={fields} />

export default reduxForm({ form: 'Settings', validate })(SettingsForm)
