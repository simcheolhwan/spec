import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateProject, deleteProject } from '../actions/project'
import { sanitize } from '../helpers/utils'
import Page from '../components/Page'
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
    this.setState({ status: 'submitting' }, () =>
      onUpdate(key, sanitize(updates))
    )
  }

  render() {
    const { project } = this.props
    const { error } = this.state

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

        <Page title="Danger Zone" variant={{ marginTop: '2.5rem' }}>
          <section style={{ display: 'flex', marginBottom: '1rem' }}>
            <header style={{ flex: 1 }}>
              <h3>Make this repository private</h3>
              <p>Hide this repository from the public.</p>
            </header>
            <div style={{ flex: 'none', width: '8rem' }}>
              <button
                style={{ width: '100%' }}
                onClick={this.close}
                disabled={project.isClosed}
              >
                Close project
              </button>
            </div>
          </section>

          <section style={{ display: 'flex' }}>
            <header style={{ flex: 1 }}>
              <h3>Delete this repository</h3>
              <p>
                Once you delete a repository, there is no going back. Please be
                certain.
              </p>
            </header>
            <div style={{ flex: 'none', width: '8rem' }}>
              <button style={{ width: '100%' }} onClick={this.delete}>
                Delete project
              </button>
            </div>
          </section>
        </Page>
      </div>
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
