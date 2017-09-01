import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const Nav = ({ authenticated }) => (
  <nav>
    {authenticated ? (
      <section>
        <Link to="/new">New project</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/signout">Sign out</Link>
      </section>
    ) : (
      <section>
        <Link to="/signin">Sign in</Link>
      </section>
    )}
  </nav>
)

Nav.propTypes = propTypes

const mapStateToProps = ({ auth }) => auth

export default connect(mapStateToProps)(Nav)
