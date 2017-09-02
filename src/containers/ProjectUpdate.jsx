import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateProject, deleteProject } from '../actions/project'
import { slugify } from '../helpers/utils'
import Form from '../components/Form'

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  projectKey: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

class ProjectUpdate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ...this.props.project,
      status: '',
      error: {}
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleInputChange(event) {
    const { name, type, value, checked } = event.target
    this.setState({ [name]: type === 'checkbox' ? checked : value })
  }

  handleSubmit(event) {
    const { title, slug, disabled } = this.sanitize()
    const { isPrivate } = this.state
    const { projectKey: key, onUpdate } = this.props

    event.preventDefault()
    !disabled &&
      this.setState({ status: 'submitting' }, () =>
        onUpdate(key, { title, slug, isPrivate })
      )
  }

  handleClose() {
    const { projectKey: key, onUpdate } = this.props
    this.setState({ status: 'submitting' }, () =>
      onUpdate(key, { isClosed: true })
    )
  }

  handleDelete() {
    const { projectKey: key, onDelete } = this.props
    this.setState({ status: 'submitting' }, () => onDelete(key))
  }

  sanitize() {
    const { title: _title, slug: _slug } = this.state
    const title = _title.trim()
    const slug = slugify(_slug)
    return { title, slug, disabled: !(title && slug) }
  }

  render() {
    const { project } = this.props
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
      <article>
        <Form {...formProps} />

        <button onClick={this.handleClose} disabled={project.isClosed}>
          Close project
        </button>

        <button onClick={this.handleDelete}>Delete project</button>
      </article>
    ) : (
      <Redirect to="/signin" />
    )
  }
}

ProjectUpdate.propTypes = propTypes

const mapStateToProps = ({ auth, user }, ownProps) => {
  const slug = ownProps.match.params.project
  const key = _.findKey(user.projects.list, ['slug', slug])

  return {
    authenticated: auth.authenticated,
    projectKey: key,
    project: user.projects.list[key]
  }
}

const mapDispatchToProps = dispatch => ({
  onUpdate: (key, updates) => dispatch(updateProject(key, updates)),
  onDelete: key => dispatch(deleteProject(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUpdate)
