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
  state: PropTypes.oneOf(['idle', 'auth', 'user']).isRequired,
  error: PropTypes.object.isRequired,
  signin: PropTypes.func.isRequired
}

const Signin = ({ state, error, signin }) => {
  const ui = {
    idle: null,
    auth: (
      <Page title="Sign in">
        <SigninForm
          onSubmit={user => signin(sanitize(user))}
          submitButton="Sign in"
          errorMessage={error.message}
        />
      </Page>
    ),
    user: <Redirect to="/" />
  }

  return ui[state]
}

Signin.propTypes = propTypes

const mapStateToProps = ({ auth }) => auth
const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
