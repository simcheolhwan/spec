import React from 'react'
import PropTypes from 'prop-types'
import { BOLD } from '../styles'

const propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      button: PropTypes.shape({
        label: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired
      }).isRequired
    })
  ).isRequired
}

const Actions = ({ list }) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {list.map(({ title, description, button }, index) => (
      <li style={{ display: 'flex', marginBottom: '1rem' }} key={index}>
        <header style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: BOLD }}>{title}</h3>
          <p>{description}</p>
        </header>

        <div style={{ flex: 'none', width: '10rem' }}>
          <button
            style={{ width: '100%' }}
            onClick={button.action}
            disabled={button.disabled}
          >
            {button.label}
          </button>
        </div>
      </li>
    ))}
  </ul>
)

Actions.propTypes = propTypes

export default Actions
