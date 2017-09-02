import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import renderField from './Field'

const propTypes = {
  fields: PropTypes.object.isRequired,
  errorMessage: PropTypes.string
}

const defaultProps = {
  errorMessage: ''
}

const Form = ({ fields, errorMessage, ...rest }) => {
  const { pristine, submitting, submitSucceeded } = rest
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

      <button type="submit" disabled={pristine || submitting}>
        Submit
      </button>

      {errorMessage || (submitting ? '🔄' : submitSucceeded && '✅')}
    </form>
  )
}

Form.propTypes = propTypes
Form.defaultProps = defaultProps

export default Form
