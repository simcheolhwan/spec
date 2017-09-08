import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateProject, deleteProject } from '../actions/project'
import { sanitize } from '../helpers/utils'
import Page from '../components/Page'
import Actions from '../components/Actions'
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
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.delete = this.delete.bind(this)
  }

  update(updates) {
    const { projectKey: key, onUpdate } = this.props
    this.setState({ status: 'submitting' }, () =>
      onUpdate(key, sanitize(updates))
    )
  }

  open() {
    const { projectKey: key, onUpdate } = this.props
    this.setState({ status: 'submitting' }, () =>
      onUpdate(key, { isClosed: false })
    )
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

  render() {
    const { project } = this.props
    const { error } = this.state

    const destructiveActions = [
      {
        title: 'Make this repository private',
        description: 'Hide this repository from the public.',
        button: project.isClosed
          ? {
              label: 'Reopen project',
              action: this.open
            }
          : {
              label: 'Close project',
              action: this.close
            }
      },
      {
        title: 'Delete this repository',
        description:
          'Once you delete a repository, there is no going back. ' +
          'Please be certain.',
        button: {
          label: 'Delete project',
          action: this.delete
        }
      }
    ]

    return this.props.authenticated ? (
      <div>
        <Page title="Settings">
          <ProjectForm
            initialValues={project}
            onSubmit={this.update}
            submitButton="Update project"
            errorMessage={error.message}
          />
        </Page>

        <Page title="Danger Zone">
          <Actions list={destructiveActions} />
        </Page>
      </div>
    ) : (
      <Redirect to="/signin" />
    )
  }
}

ProjectUpdate.propTypes = propTypes

const mapStateToProps = ({ auth, projects, user }, ownProps) => {
  const { user: slug, project } = ownProps.match.params
  const isOwned = slug === auth.user.slug
  const { list } = isOwned ? projects : user.projects
  const key = _.findKey(list, ['slug', project])

  return {
    authenticated: auth.authenticated,
    projectKey: key,
    project: list[key]
  }
}

const mapDispatchToProps = dispatch => ({
  onUpdate: (key, updates) => dispatch(updateProject(key, updates)),
  onDelete: key => dispatch(deleteProject(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUpdate)
