import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../../styles'

const propTypes = {
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired
}

const defaultProps = {
  description: ''
}

const Description = ({ description, onChange, onKeyPress, readOnly }) => (
  <div style={style}>
    <textarea
      value={description}
      onChange={onChange}
      onKeyDown={onKeyPress}
      readOnly={readOnly}
      style={style.textarea}
      cols={40}
      rows={2}
    />
  </div>
)

Description.propTypes = propTypes
Description.defaultProps = defaultProps

const position = {
  position: 'absolute',
  bottom: '100%',
  right: 0
}

const style = {
  ...position,

  textarea: {
    borderColor: colors.line,
    resize: 'none',
    maxWidth: '100%'
  }
}

export default Description
