import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func
}

const defaultProps = {
  autoFocus: false,
  onKeyPress: () => null
}

const Field = ({ name, label, ...rest }) =>
  <div>
    <label htmlFor={name}>
      {label}
    </label>
    <input name={name} id={name} {...rest} />
  </div>

Field.propTypes = propTypes
Field.defaultProps = defaultProps

export default Field
