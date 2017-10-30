import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../../styles'
import { Done, Blank } from '../Icons'
import Button from '../Button'

const propTypes = {
  checked: PropTypes.bool,
  variant: PropTypes.object,
  onClick: PropTypes.func
}

const defaultProps = {
  checked: false,
  variant: {},
  onClick: () => undefined
}

const Checkbox = ({ checked, variant, onClick }) => (
  <Button variant={{ ...style, ...variant }} onClick={onClick}>
    {checked ? <Done color={colors.olive} /> : <Blank color={colors.gray} />}
  </Button>
)

Checkbox.propTypes = propTypes
Checkbox.defaultProps = defaultProps

const style = {
  justifyContent: 'flex-start',
  alignSelf: 'stretch'
}

export default Checkbox
