import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signin } from '../actions/auth'
import { sanitize } from '../utils'
import Page from '../components/Page'
import SigninForm from './SigninForm'

const propTypes = {
  state: PropTypes.oneOf(['idle', 'guest', 'user']).isRequired,
  error: PropTypes.object.isRequired,
  signin: PropTypes.func.isRequired
}

const Signin = ({ state, error, signin }) => {
  const submit = user => signin(sanitize(user))

  const ui = {
    guest: (
      <Page title="Sign in">
        <SigninForm
          onSubmit={submit}
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
const mapDispatchToProps = dispatch => bindActionCreators({ signin }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
