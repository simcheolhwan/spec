import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchProjects, createProject } from '../../actions/projectActions'
import { sanitize } from '../../utils'
import Page from '../Page'
import Form from './ProjectForm'

const propTypes = {
  state: PropTypes.oneOf(['idle', 'guest', 'user']).isRequired,
  createProject: PropTypes.func.isRequired
}

class ProjectCreate extends Component {
  componentWillMount() {
    const { action, user, fetchProjects } = this.props
    action.fetchProjects && fetchProjects(user.uid)
  }

  submit = project => this.props.createProject(sanitize(project))

  render() {
    const { state } = this.props

    const ui = {
      idle: null,
      guest: <Redirect to="/signin" />,
      user: (
        <Page title="Create a new project">
          <Form onSubmit={this.submit} submitButton="Create project" />
        </Page>
      )
    }

    return ui[state]
  }
}

ProjectCreate.propTypes = propTypes

const mapStateToProps = ({ auth, projects }) => {
  const matchProjects = auth.user.uid === projects.user

  return {
    state: matchProjects ? auth.state : 'idle',
    action: { fetchProjects: !matchProjects },
    user: auth.user,
    error: projects.error
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchProjects, createProject }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate)
