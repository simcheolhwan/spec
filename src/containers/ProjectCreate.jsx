import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createProject } from '../actions/project'
import { sanitize } from '../helpers/utils'
import Page from '../components/Page'
import ProjectForm from './ProjectForm'

const propTypes = {
  state: PropTypes.oneOf(['idle', 'auth', 'user']).isRequired,
  error: PropTypes.object.isRequired,
  onCreate: PropTypes.func.isRequired
}

const ProjectCreate = ({ state, error, onCreate }) => {
  const ui = {
    idle: null,
    auth: <Redirect to="/signin" />,
    user: (
      <Page title="Create a new project">
        <ProjectForm
          onSubmit={project => onCreate(sanitize(project))}
          submitButton="Create project"
          errorMessage={error.message}
        />
      </Page>
    )
  }

  return ui[state]
}

ProjectCreate.propTypes = propTypes

const mapStateToProps = ({ auth, projects }) => ({
  state: auth.state,
  error: projects.error
})

const mapDispatchToProps = dispatch => ({
  onCreate: project => dispatch(createProject(project))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate)
