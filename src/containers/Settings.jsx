import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { database } from '../constants/firebase'
import { sanitize } from '../helpers/utils'
import SettingsForm from './SettingsForm'

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = { user: {}, status: '', error: {} }
    this.update = this.update.bind(this)
  }

  componentWillMount() {
    this.getUser(this.props.user.uid)
  }

  getUser(uid) {
    database
      .ref(`/users/${uid}`)
      .once('value', snap =>
        this.setState({ user: snap.val(), status: 'fetched' })
      )
      .catch(error => this.setState({ status: 'error', error }))
  }

  update(user) {
    this.setState({ status: 'submitting' }, () =>
      database
        .ref(`/users/${user.uid}`)
        .set(sanitize(user))
        .then(() => this.setState({ status: 'done' }))
        .catch(error => this.setState({ status: 'error', error }))
    )
  }

  render() {
    const { authenticated } = this.props
    const { user, status } = this.state
    return authenticated ? status ? (
      <SettingsForm initialValues={user} onSubmit={this.update} />
    ) : null : (
      <Redirect to="/signin" />
    )
  }
}

Settings.propTypes = propTypes

const mapStateToProps = ({ auth }) => auth

export default connect(mapStateToProps)(Settings)
