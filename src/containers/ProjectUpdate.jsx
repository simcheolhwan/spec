import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createProject } from '../actions/project'
import { slugify } from '../helpers/utils'
import Form from '../components/Form'

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired
}

class ProjectUpdate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      slug: '',
      isPrivate: false,
      status: '',
      error: {}
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const { name, type, value, checked } = event.target
    this.setState({ [name]: type === 'checkbox' ? checked : value })
  }

  handleSubmit(event) {
    const { title, slug, disabled } = this.sanitize()
    const { isPrivate } = this.state
    const { onCreate } = this.props

    event.preventDefault()
    !disabled &&
      this.setState({ status: 'submitting' }, () =>
        onCreate({ title, slug, isPrivate })
      )
  }

  sanitize() {
    const { title: _title, slug: _slug } = this.state
    const title = _title.trim()
    const slug = slugify(_slug)
    return { title, slug, disabled: !(title && slug) }
  }

  render() {
    const { title, slug, isPrivate, status, error } = this.state
    const { disabled } = this.sanitize()

    const fields = {
      Title: { type: 'text', value: title, autoFocus: true },
      Slug: { type: 'text', value: slug },
      Private: { type: 'checkbox', name: 'isPrivate', checked: isPrivate }
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

    return this.props.authenticated ? (
      <Form {...formProps} />
    ) : (
      <Redirect to="/signin" />
    )
  }
}

ProjectUpdate.propTypes = propTypes

const mapStateToProps = ({ auth }) => ({ authenticated: auth.authenticated })
const mapDispatchToProps = dispatch => ({
  onCreate: project => dispatch(createProject(project))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUpdate)
