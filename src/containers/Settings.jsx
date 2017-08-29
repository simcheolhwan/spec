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
    this.state = { name: '', slug: '', slugified: '', status: '', error: {} }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    const { user } = this.props

    database
      .ref(`/users/${user.uid}`)
      .once('value', snap =>
        this.setState({
          ...snap.val(),
          slugified: snap.val().slug,
          status: 'fetched'
        })
      )
      .catch(error => this.setState({ status: 'error', error }))
  }

  handleInputChange(event) {
    const { name, value } = event.target

    if (name === 'slug') {
      const slugified = slugify(value)
      this.setState({ slugified })
    }

    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    const { user } = this.props
    const { name, slugified } = this.state

    event.preventDefault()
    slugified &&
      database
        .ref(`/users/${user.uid}`)
        .set({ name, slug: slugified })
        .then(() => this.setState({ status: 'done' }))
        .catch(error => this.setState({ error, status: 'error' }))
  }

  render() {
    const { name, slug, slugified, status, error } = this.state
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

        <code>{slugified}</code>

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
