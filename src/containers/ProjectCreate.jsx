import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createProject } from '../actions/project'
import { sanitize } from '../utils'
import Page from '../components/Page'
import ProjectForm from './ProjectForm'

const propTypes = {
  state: PropTypes.oneOf(['guest', 'user']).isRequired,
  createProject: PropTypes.func.isRequired
}

const ProjectCreate = ({ state, createProject }) => {
  const ui = {
    guest: <Redirect to="/signin" />,
    user: (
      <Page title="Create a new project">
        <ProjectForm
          onSubmit={project => createProject(sanitize(project))}
          submitButton="Create project"
        />
      </Page>
    )
  }

  return ui[state]
}

ProjectCreate.propTypes = propTypes

const mapStateToProps = ({ auth: { state }, projects: { error } }) => ({
  state,
  error
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createProject }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate)
