import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.object,
  children: PropTypes.node.isRequired
}

const defaultProps = {
  color: '#000000',
  size: '1rem',
  variant: {}
}

const Icon = ({ color, size, variant, children }) => (
  <svg
    fill={color}
    width={size}
    height={size}
    style={variant}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
)

Icon.propTypes = propTypes
Icon.defaultProps = defaultProps

export default Icon
