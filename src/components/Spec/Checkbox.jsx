import React from 'react'
import PropTypes from 'prop-types'
import { StatusList } from './Status'
import { colors } from '../../styles'
import { Hourglass, Blank, Play, Done, DoneAll } from '../Icons'
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
    {status ? (
      {
        [StatusList.BACKLOG]: <Hourglass color={colors.gray} />,
        [StatusList.TO_DO]: <Play color={colors.blue} />,
        [StatusList.IN_PROGRESS]: <Done color={colors.orange} />
      }[status]
    ) : checked ? (
      <DoneAll color={colors.olive} variant={{ opacity: 0.5 }} />
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
