import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles'

const propTypes = {
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  variant: PropTypes.object,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func
}

const defaultProps = {
  name: '',
  readOnly: false,
  variant: {},
  onChange: () => undefined,
  onKeyPress: () => undefined
}

const Name = ({ name, readOnly, variant, onChange, onKeyPress }) => (
  <input
    style={{ ...styles.input, ...variant }}
    value={name}
    readOnly={readOnly}
    onChange={onChange}
    onKeyPress={onKeyPress}
  />
)

Name.propTypes = propTypes
Name.defaultProps = defaultProps

export default Name
