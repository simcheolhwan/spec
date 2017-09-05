import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { colors } from '../styles'

const propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
}

const Nav = ({ title, links }) => (
  <nav style={style.Nav}>
    <header>
      <h1 style={style.title}>
        <Link to="/" style={style.link}>
          {title}
        </Link>
      </h1>
    </header>

    <section style={style.list}>
      {links.map(({ to, label }) => (
        <Link to={'/' + to} style={style.link} key={to}>
          {label}
        </Link>
      ))}
    </section>
  </nav>
)

Nav.propTypes = propTypes

const style = {
  Nav: {
    backgroundColor: colors.black,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 1rem'
  },

  title: {
    fontSize: '1rem'
  },

  list: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  link: {
    color: 'hsla(0, 0%, 100%, .75)',
    display: 'block',
    padding: '1rem'
  }
}

export default Nav
