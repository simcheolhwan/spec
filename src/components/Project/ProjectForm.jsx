import React from 'react'
import { reduxForm } from 'redux-form'
import { slugify } from '../../utils'
import Form from '../Form'

const fields = {
  Title: { type: 'text' },
  Slug: { type: 'text' },
  Private: { type: 'checkbox', name: 'isPrivate' }
}

const validate = ({ title = '', slug = '' }) => {
  const errors = {}
  errors.title = !title.trim() && 'Required'
  errors.slug = !slugify(slug) && 'Required'
  return errors
}

const ProjectForm = props => <Form fields={fields} {...props} />

export default reduxForm({ form: 'Project', validate })(ProjectForm)
