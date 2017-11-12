import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../../styles'

const propTypes = {
  onSelect: PropTypes.func.isRequired
}

export const StatusList = { IN_PROGRESS: 'In Progress' }

const Status = ({ status: current, onSelect }) => (
  <ul style={style}>
    {Object.keys(StatusList).map(key => {
      const status = StatusList[key]
      const selected = current === status
      const fontWeight = selected && 'bold'
      const onClick = () => onSelect(status)
      return (
        <li style={{ ...style.item, fontWeight }} onClick={onClick} key={key}>
          {status}
        </li>
      )
    })}
  </ul>
)

Status.propTypes = propTypes

const position = {
  position: 'absolute',
  top: '1.75rem',
  right: 0,
  zIndex: 1
}

const style = {
  ...position,
  backgroundColor: 'white',
  border: `1px solid ${colors.line}`,

  item: {
    cursor: 'pointer',
    fontSize: '.75rem',
    padding: '0 .5rem'
  }
}

export default Status
