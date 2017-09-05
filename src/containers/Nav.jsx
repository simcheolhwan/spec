import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { colors } from '../styles'

const propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const Nav = ({ authenticated, user }) => {
  const links = authenticated
    ? [
        { to: 'new', label: 'New project' },
        { to: user.slug, label: 'Projects' },
        { to: 'settings', label: 'Settings' },
        { to: 'signout', label: 'Sign out' }
      ]
    : [{ to: 'signin', label: 'Sign in' }]

  return (
    <nav style={style.Nav}>
      <header>
        <h1 style={style.Title}>
          <Link to="/" style={style.Link}>
            Specs
          </Link>
        </h1>
      </header>
      <section style={style.List}>
        {links.map(({ to, label }) => (
          <Link to={'/' + to} style={style.Link} key={to}>
            {label}
          </Link>
        ))}
      </section>
    </nav>
  )
}

Nav.propTypes = propTypes

const style = {
  Nav: {
    backgroundColor: colors.black,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 1rem'
  },

  Title: {
    fontSize: '1rem'
  },

  List: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  Link: {
    color: 'hsla(0, 0%, 100%, .75)',
    display: 'block',
    padding: '1rem'
  }
}

const mapStateToProps = ({ auth }) => auth

export default connect(mapStateToProps)(Nav)
