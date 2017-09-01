import React from 'react'
import PropTypes from 'prop-types'
// import { slugify } from '../helpers/utils'
import Field from './Field'

const propTypes = {
  fields: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  isSubmitting: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

const defaultProps = {
  errorMessage: ''
}

const Form = ({ fields, disabled, ...rest }) => {
  const { errorMessage, isSubmitting, isDone, onInputChange, onSubmit } = rest

  return (
    <form onSubmit={onSubmit}>
      {Object.keys(fields).map(key => (
        <Field
          label={key}
          name={key.toLowerCase()}
          onChange={onInputChange}
          {...fields[key]}
          key={key}
        />
      ))}

      {/* <code>{slugify(slug)}</code> */}

      <button type="submit" disabled={disabled || isSubmitting}>
        Submit
      </button>

      {errorMessage || (isSubmitting ? '🔄' : isDone && '✅')}
    </form>
  )
}

Form.propTypes = propTypes
Form.defaultProps = defaultProps

export default Form
