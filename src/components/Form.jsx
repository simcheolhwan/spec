import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import renderField from './Field'

const propTypes = {
  fields: PropTypes.object.isRequired
}

const Form = ({ fields, ...rest }) => {
  const { pristine, valid, submitting, submitSucceeded } = rest
  const { handleSubmit } = rest

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(fields).map(key => (
        <Field
          label={key}
          name={key.toLowerCase()}
          normalize={v => (fields[key].type === 'checkbox' ? !!v : v)}
          component={renderField}
          key={key}
          {...fields[key]}
        />
      ))}

      <button type="submit" disabled={pristine || !valid || submitting}>
        Submit
      </button>

      {submitting ? '🔄' : submitSucceeded && '✅'}
    </form>
  )
}

Form.propTypes = propTypes

export default Form
