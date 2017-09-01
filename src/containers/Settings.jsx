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
    this.state = { name: '', slug: '', status: '', error: {} }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    const { user } = this.props

    database
      .ref(`/users/${user.uid}`)
      .once('value', snap =>
        this.setState({ ...snap.val(), status: 'fetched' })
      )
      .catch(error => this.setState({ status: 'error', error }))
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    const { user } = this.props
    const { name, slug, disabled } = this.sanitize()
    event.preventDefault()
    !disabled &&
      this.setState({ status: 'submitting' }, () =>
        database
          .ref(`/users/${user.uid}`)
          .set({ name, slug })
          .then(() => this.setState({ status: 'done' }))
          .catch(error => this.setState({ status: 'error', error }))
      )
  }

  sanitize() {
    const { name: _name, slug: _slug } = this.state
    const name = _name.trim()
    const slug = slugify(_slug)
    return { name, slug, disabled: !(name && slug) }
  }

  render() {
    const { name, slug, status, error } = this.state
    const { disabled } = this.sanitize()
    const fields = {
      Name: { value: name, autoFocus: true },
      Slug: { value: slug }
    }

    return this.props.authenticated ? status ? (
      <form onSubmit={this.handleSubmit}>
        {Object.keys(fields).map(key => (
          <Field
            {...fields[key]}
            label={key}
            type="text"
            name={key.toLowerCase()}
            onChange={this.handleInputChange}
            key={key}
          />
        ))}

        <code>{slugify(slug)}</code>

        <button type="submit" disabled={disabled}>
          Submit
        </button>

        {error.message ||
          (status === 'submitting' ? '🔄' : status === 'done' && '✅')}
      </form>
    ) : null : (
      <Redirect to="/signin" />
    )
  }
}

Settings.propTypes = propTypes

const mapStateToProps = ({ auth }) => auth

export default connect(mapStateToProps)(Settings)
