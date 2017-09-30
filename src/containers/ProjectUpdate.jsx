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
  updateProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired
}

const ProjectUpdate = ({ state, projectKey, project, ...rest }) => {
  const { updateProject, deleteProject } = rest

  const open = () => update({ isClosed: false })
  const close = () => update({ isClosed: true })
  const submit = updates => update(sanitize(updates))
  const update = updates => updateProject(projectKey, updates)
  const _delete = () => deleteProject(projectKey)

  const destructiveActions = [
    {
      title: 'Make this repository private',
      description: 'Hide this repository from the public.',
      button: project.isClosed
        ? { label: 'Reopen project', action: open }
        : { label: 'Close project', action: close }
    },
    {
      title: 'Delete this repository',
      description:
        'Once you delete a repository, there is no going back. ' +
        'Please be certain.',
      button: {
        label: 'Delete project',
        action: _delete
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
            onSubmit={submit}
            submitButton="Update project"
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
  ...getProject(state, ownProps)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateProject, deleteProject }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUpdate)
