import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as authActions from '../actions/auth'
import Field from '../components/Field'

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
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

  handleSubmit() {
    const { email, password } = this.state
    email && password && this.props.signin({ email, password })
  }

  render() {
    const { authenticated, error } = this.props
    const { email, password } = this.state
    const fields = {
      Email: { type: 'email', value: email, autoFocus: true },
      Password: { type: 'password', value: password }
    }

    return authenticated
      ? <Redirect to="/" />
      : <form>
          {Object.keys(fields).map(key =>
            <Field
              {...fields[key]}
              label={key}
              name={key.toLowerCase()}
              onChange={this.handleInputChange}
              onKeyPress={event => event.key === 'Enter' && this.handleSubmit()}
              key={key}
            />
          )}

          {error.message &&
            <p>
              {error.message}
            </p>}
        </form>
  }
}

Signin.propTypes = propTypes

const mapStateToProps = ({ auth }) => auth
const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
