import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as projectActions from '../actions/project'
import { slugify } from '../helpers/utils'
import Form from '../components/Form'

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  createProject: PropTypes.func.isRequired
}

class ProjectCreate extends Component {
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
    const { createProject } = this.props

    event.preventDefault()
    !disabled &&
      this.setState({ status: 'submitting' }, () =>
        createProject({ title, slug, isPrivate })
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
      Private: { type: 'checkbox', name: 'isPrivate', value: isPrivate }
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

ProjectCreate.propTypes = propTypes

const mapStateToProps = ({ auth }) => ({ authenticated: auth.authenticated })
const mapDispatchToProps = dispatch =>
  bindActionCreators(projectActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate)
