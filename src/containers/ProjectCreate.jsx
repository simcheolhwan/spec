import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createProject } from '../actions/project'
import { sanitize } from '../helpers/utils'
import ProjectForm from './ProjectForm'

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired
}

class ProjectCreate extends Component {
  constructor(props) {
    super(props)
    this.state = { status: '', error: {} }
    this.create = this.create.bind(this)
  }

  create(updates) {
    const { onCreate } = this.props
    this.setState({ status: 'submitting' }, () => onCreate(sanitize(updates)))
  }

  render() {
    const { error } = this.state

    return this.props.authenticated ? (
      <ProjectForm onSubmit={this.create} errorMessage={error.message} />
    ) : (
      <Redirect to="/signin" />
    )
  }
}

ProjectCreate.propTypes = propTypes

const mapStateToProps = ({ auth }) => ({ authenticated: auth.authenticated })
const mapDispatchToProps = dispatch => ({
  onCreate: project => dispatch(createProject(project))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate)
