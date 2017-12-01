import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { colors } from '../../styles'
import { isProduction } from '../../config/env'
import { Fullscreen } from '../Icons'
import Progress from '../Progress/Progress'

const propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  hideNav: PropTypes.func.isRequired
}

const Nav = ({ title, indicator, links, hideNav }) => (
  <nav style={style}>
    <header>
      <h1 style={style.title}>
        <Link to="/" style={style.link}>
          {title}
        </Link>
      </h1>
    </header>

    <section style={style.list}>
      {indicator && (
        <Progress color={colors.white} variant={{ opacity: OPACITY }} />
      )}

      {links.map(({ to, label }) => (
        <Link to={'/' + to} style={style.link} key={to}>
          {label}
        </Link>
      ))}

      <button style={style.button} onClick={hideNav}>
        <Fullscreen size="1.5rem" color={COLOR} />
      </button>
    </section>
  </nav>
)

Nav.propTypes = propTypes

const OPACITY = 0.75
const COLOR = `hsla(0, 0%, 100%, ${OPACITY})`

const style = {
  backgroundColor: isProduction ? colors.black : colors.navy,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 1rem',

  title: {
    fontSize: '1rem'
  },

  list: {
    display: 'flex',
    alignItems: 'stretch'
  },

  link: {
    color: COLOR,
    display: 'block',
    padding: '1rem'
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    border: 0,
    cursor: 'pointer'
  }
}

export default Nav
