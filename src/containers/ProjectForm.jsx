import React from 'react'
import { reduxForm } from 'redux-form'
import Form from '../components/Form'

const fields = {
  Title: { type: 'text', autoFocus: true },
  Slug: { type: 'text' },
  Private: { type: 'checkbox', name: 'isPrivate' }
}

const ProjectForm = props => <Form {...props} fields={fields} />

export default reduxForm({ form: 'Project' })(ProjectForm)
