import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as authActions from '../actions/auth'
import { sanitize } from '../helpers/utils'
import Page from '../components/Page'
import SigninForm from './SigninForm'

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  state: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
  signin: PropTypes.func.isRequired
}

const Signin = ({ authenticated, state, error, signin }) =>
  authenticated ? (
    <Redirect to="/" />
  ) : (
    <Page title="Sign in">
      <SigninForm
        onSubmit={user => signin(sanitize(user))}
        submitButton="Sign in"
        errorMessage={error.message}
      />
    </Page>
  )

Signin.propTypes = propTypes

const mapStateToProps = ({ auth }) => auth
const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
