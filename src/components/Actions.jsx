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

const Action = ({ title, description, button }) => (
  <article style={style.Action}>
    <header style={style.Action.header}>
      <h3 style={style.Action.title}>{title}</h3>
      <p>{description}</p>
    </header>

    <section style={style.Action.button.container}>
      <button
        style={style.Action.button}
        onClick={button.action}
        disabled={button.disabled}
      >
        {button.label}
      </button>
    </section>
  </article>
)

const Actions = ({ list }) => (
  <ul style={style.list}>
    {list.map((item, index) => (
      <li style={style.item} key={index}>
        <Action {...item} />
      </li>
    ))}
  </ul>
)

Actions.propTypes = propTypes

const style = {
  list: { listStyle: 'none', padding: 0 },
  item: { marginBottom: '1rem' },

  Action: {
    display: 'flex',
    header: { flex: 1 },
    title: { fontSize: '1rem', fontWeight: BOLD },
    button: {
      width: '100%',
      container: { flex: 'none', width: '10rem' }
    }
  }
}

export default Actions
