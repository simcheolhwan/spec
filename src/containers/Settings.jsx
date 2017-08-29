import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { slugify } from '../helpers/utils'
import { database } from '../constants/firebase'
import Field from '../components/Field'

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '', slug: '', status: '', error: {} }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    const { user } = this.props

    database
      .ref(`/users/${user.uid}/slug`)
      .once('value', snap =>
        this.setState({
          value: snap.val(),
          slug: snap.val(),
          status: 'fetched'
        })
      )
      .catch(error => this.setState({ status: 'error', error }))
  }

  handleInputChange(value) {
    const slug = slugify(value)
    this.setState({ value, slug })
  }

  handleSubmit(event) {
    const { slug } = this.state
    const { user } = this.props

    event.preventDefault()
    slug &&
      database
        .ref(`/users/${user.uid}/slug`)
        .set(slug)
        .then(() => this.setState({ status: 'done' }))
        .catch(error => this.setState({ error, status: 'error' }))
  }

  render() {
    const { value, slug, status, error } = this.state

    return this.props.authenticated ? status ? (
      <form onSubmit={this.handleSubmit}>
        <Field
          name="slug"
          label="Slug"
          type="text"
          value={value}
          onChange={event => this.handleInputChange(event.target.value)}
          autoFocus
        />

        <code>{slug}</code>

        <button type="submit">Submit</button>

        {error.message || (status === 'done' && '✔︎')}
      </form>
    ) : null : (
      <Redirect to="/signin" />
    )
  }
}

Settings.propTypes = propTypes

const mapStateToProps = ({ auth }) => auth

export default connect(mapStateToProps)(Settings)
