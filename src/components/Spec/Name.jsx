import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles'

const propTypes = {
  name: PropTypes.string,
  variant: PropTypes.object,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func
}

const defaultProps = {
  name: '',
  variant: {},
  onChange: () => undefined,
  onKeyPress: () => undefined
}

const Name = ({ name, variant, onChange, onKeyPress }) => (
  <input
    style={{ ...styles.input, ...variant }}
    value={name}
    onChange={onChange}
    onKeyPress={onKeyPress}
  />
)

Name.propTypes = propTypes
Name.defaultProps = defaultProps

export default Name
