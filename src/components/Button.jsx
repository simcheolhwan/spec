import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles'

const propTypes = {
  variant: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

const defaultProps = {
  variant: {},
  onClick: () => undefined
}

const Button = ({ variant, onClick, children }) => (
  <button style={{ ...style, ...variant }} onClick={onClick}>
    {children}
  </button>
)

Button.propTypes = propTypes
Button.defaultProps = defaultProps

const style = {
  ...styles.button,
  ...styles.button.icon
}

export default Button
