import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as authActions from '../actions/auth'
import { sanitize } from '../helpers/utils'
import SigninForm from './SigninForm'

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
  signin: PropTypes.func.isRequired
}

const Signin = ({ authenticated, status, error, signin }) =>
  authenticated ? (
    <Redirect to="/" />
  ) : (
    <SigninForm
      onSubmit={user => signin(sanitize(user))}
      errorMessage={error.message}
    />
  )

Signin.propTypes = propTypes

const mapStateToProps = ({ auth }) => auth
const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
