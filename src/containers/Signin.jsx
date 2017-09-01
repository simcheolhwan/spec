import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as authActions from '../actions/auth'
import Form from '../components/Form'

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
  signin: PropTypes.func.isRequired
}

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '' }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    const { email, password, disabled } = this.sanitize()
    event.preventDefault()
    !disabled && this.props.signin({ email, password })
  }

  sanitize() {
    const { email: _email, password } = this.state
    const email = _email.trim()
    return { email, password, disabled: !(email && password) }
  }

  render() {
    const { authenticated, status, error } = this.props
    const { email, password } = this.state
    const { disabled } = this.sanitize()

    const fields = {
      Email: { type: 'email', value: email, autoFocus: true },
      Password: { type: 'password', value: password }
    }

    const formProps = {
      fields,
      disabled,
      errorMessage: error.message,
      isSubmitting: status === 'submitting',
      isDone: status === 'done',
      onInputChange: this.handleInputChange,
      onSubmit: this.handleSubmit
    }

    return authenticated ? <Redirect to="/" /> : <Form {...formProps} />
  }
}

Signin.propTypes = propTypes

const mapStateToProps = ({ auth }) => auth
const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
