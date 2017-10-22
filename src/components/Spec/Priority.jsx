import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../../styles'
import { ArrowUpward, ArrowDownward } from '../Icons'
import Button from '../Button'

const propTypes = {
  priority: PropTypes.oneOf([undefined, -1, 0, 1]),
  variant: PropTypes.object,
  onClickUpward: PropTypes.func,
  onClickDownward: PropTypes.func
}

const defaultProps = {
  variant: {},
  onClickUpward: () => undefined,
  onClickDownward: () => undefined
}

const Priority = ({ priority, variant, onClickUpward, onClickDownward }) => [
  <Button
    variant={{ ...style, ...variant.upward }}
    onClick={onClickUpward}
    key="upward"
  >
    <ArrowUpward color={priority === 1 ? colors.red : colors.silver} />
  </Button>,
  <Button
    variant={{ ...style, ...variant.downward }}
    onClick={onClickDownward}
    key="downward"
  >
    <ArrowDownward color={priority === -1 ? colors.olive : colors.silver} />
  </Button>
]

Priority.propTypes = propTypes
Priority.defaultProps = defaultProps

const style = {
  alignSelf: 'stretch',
  width: '1rem'
}

export default Priority
