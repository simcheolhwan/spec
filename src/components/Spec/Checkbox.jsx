import React from 'react'
import PropTypes from 'prop-types'
import { StatusList } from './Status'
import { colors } from '../../styles'
import { Done, Blank } from '../Icons'
import Button from '../Button'

const propTypes = {
  checked: PropTypes.bool,
  status: PropTypes.oneOf(Object.values(StatusList)),
  variant: PropTypes.object,
  onClick: PropTypes.func
}

const defaultProps = {
  checked: false,
  status: null,
  variant: {},
  onClick: () => undefined
}

const Checkbox = ({ checked, status, variant, onClick }) => (
  <Button variant={{ ...style, ...variant }} onClick={onClick}>
    {status === StatusList.IN_PROGRESS ? (
      <Done color={colors.orange} />
    ) : checked ? (
      <Done color={colors.olive} />
    ) : (
      <Blank color={colors.gray} />
    )}
  </Button>
)

Checkbox.propTypes = propTypes
Checkbox.defaultProps = defaultProps

const style = {
  justifyContent: 'flex-start',
  alignSelf: 'stretch'
}

export default Checkbox
