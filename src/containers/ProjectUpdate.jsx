import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateProject, deleteProject } from '../actions/project'
import { getProject, sanitize } from '../utils'
import Page from '../components/Page'
import Actions from '../components/Actions'
import ProjectForm from './ProjectForm'

const propTypes = {
  state: PropTypes.oneOf(['idle', 'guest', 'user']).isRequired,
  projectKey: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  updateProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired
}

const ProjectUpdate = ({ state, projectKey, project, error, ...rest }) => {
  const { updateProject, deleteProject } = rest

  const destructiveActions = [
    {
      title: 'Make this repository private',
      description: 'Hide this repository from the public.',
      button: project.isClosed
        ? {
            label: 'Reopen project',
            action: () => updateProject(projectKey, { isClosed: false })
          }
        : {
            label: 'Close project',
            action: () => updateProject(projectKey, { isClosed: true })
          }
    },
    {
      title: 'Delete this repository',
      description:
        'Once you delete a repository, there is no going back. ' +
        'Please be certain.',
      button: {
        label: 'Delete project',
        action: () => deleteProject(projectKey)
      }
    }
  ]

  const ui = {
    guest: <Redirect to="/signin" />,
    user: (
      <div>
        <Page title="Settings">
          <ProjectForm
            initialValues={project}
            onSubmit={updates => updateProject(projectKey, sanitize(updates))}
            submitButton="Update project"
            errorMessage={error.message}
          />
        </Page>

        <Page title="Danger Zone">
          <Actions list={destructiveActions} />
        </Page>
      </div>
    )
  }

  return ui[state]
}

ProjectUpdate.propTypes = propTypes

const mapStateToProps = (state, ownProps) => ({
  state: state.auth.state,
  error: state.projects.error,
  ...getProject(state, ownProps)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateProject, deleteProject }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUpdate)
