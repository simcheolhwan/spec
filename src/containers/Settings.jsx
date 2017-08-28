import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { slugify } from '../helpers/utils'
import { auth } from '../constants/firebase'
import Field from '../components/Field'

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

class Settings extends Component {
  constructor(props) {
    super(props)
    const name = props.user.displayName || ''
    this.state = { name, displayName: slugify(name), status: '', error: {} }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(name) {
    const displayName = slugify(name)
    this.setState({ name, displayName })
  }

  handleSubmit(event) {
    const { displayName } = this.state

    event.preventDefault()
    displayName &&
      auth.currentUser
        .updateProfile({ displayName })
        .then(
          () => this.setState({ status: 'done' }),
          error => this.setState({ error, status: 'error' })
        )
  }

  render() {
    const { name, displayName, status, error } = this.state

    return this.props.authenticated
      ? <form onSubmit={this.handleSubmit}>
          <Field
            name="name"
            label="name"
            type="text"
            value={name}
            onChange={event => this.handleInputChange(event.target.value)}
            autoFocus
          />

          <code>
            {displayName}
          </code>

          <button type="submit">Submit</button>

          {error.message || (status === 'done' && '✔︎')}
        </form>
      : <Redirect to="/signin" />
  }
}

Settings.propTypes = propTypes

const mapStateToProps = ({ auth }) => auth

export default connect(mapStateToProps)(Settings)
