import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import renderField from './Field'
import { Sync, Done } from './Icons'

const propTypes = {
  fields: PropTypes.object.isRequired,
  submitButton: PropTypes.string
}

const defaultProps = {
  submitButton: 'Submit'
}

const Form = ({ fields, submitButton, errorMessage, ...rest }) => {
  const { pristine, valid, submitting, submitSucceeded } = rest
  const { handleSubmit } = rest

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(fields).map((key, index) => (
        <Field
          label={key}
          name={key.toLowerCase()}
          autoFocus={!index}
          component={renderField}
          normalize={v => (fields[key].type === 'checkbox' ? !!v : v)}
          key={key}
          {...fields[key]}
        />
      ))}

      <button type="submit" disabled={pristine || !valid || submitting}>
        {submitButton}
      </button>

      {errorMessage || (submitting ? <Sync /> : submitSucceeded && <Done />)}
    </form>
  )
}

Form.propTypes = propTypes
Form.defaultProps = defaultProps

export default Form
