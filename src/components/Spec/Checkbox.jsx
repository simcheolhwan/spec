import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../../styles'
import { Done, Blank } from '../Icons'
import Button from '../Button'

const propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func
}

const defaultProps = {
  onClick: () => undefined
}

const Checkbox = ({ checked, onClick }) => (
  <Button variant={style} onClick={onClick}>
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
