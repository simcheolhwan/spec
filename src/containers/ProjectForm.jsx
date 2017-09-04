import React from 'react'
import { reduxForm } from 'redux-form'
import { sanitize } from '../helpers/utils'
import Form from '../components/Form'

const fields = {
  Title: { type: 'text' },
  Slug: { type: 'text' },
  Private: { type: 'checkbox', name: 'isPrivate' }
}

const validate = values => {
  const errors = {}
  const { title, slug } = sanitize(values)
  errors.title = !title && 'Required'
  errors.slug = !slug && 'Required'
  return errors
}

const ProjectForm = props => <Form fields={fields} {...props} />

export default reduxForm({ form: 'Project', validate })(ProjectForm)
