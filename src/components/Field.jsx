import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  checked: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func
}

const defaultProps = {
  value: '',
  checked: false,
  autoFocus: false,
  onKeyPress: () => null
}

const Field = ({ name, label, ...rest }) => (
  <div>
    <label htmlFor={name} style={{ display: 'block' }}>
      {label}
    </label>
    <input name={name} id={name} {...rest} />
  </div>
)

Field.propTypes = propTypes
Field.defaultProps = defaultProps

export default Field
