import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateProject, deleteProject } from '../actions/project'
import ProjectForm from './ProjectForm'

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
    this.state = { status: '', error: {} }
    this.update = this.update.bind(this)
    this.close = this.close.bind(this)
    this.delete = this.delete.bind(this)
  }

  close() {
    const { projectKey: key, onUpdate } = this.props
    this.setState({ status: 'submitting' }, () =>
      onUpdate(key, { isClosed: true })
    )
  }

  delete() {
    const { projectKey: key, onDelete } = this.props
    this.setState({ status: 'submitting' }, () => onDelete(key))
  }

  update(updates) {
    const { projectKey: key, onUpdate } = this.props
    this.setState({ status: 'submitting' }, () => onUpdate(key, updates))
  }

  render() {
    const { project } = this.props
    const { error } = this.state

    return this.props.authenticated ? (
      <article>
        <ProjectForm
          initialValues={project}
          onSubmit={this.update}
          errorMessage={error.message}
        />

        <button onClick={this.close} disabled={project.isClosed}>
          Close project
        </button>

        <button onClick={this.delete}>Delete project</button>
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
