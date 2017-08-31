import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as projectActions from '../actions/project'

const propTypes = {
  auth: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired
}

class Nav extends Component {
  constructor(props) {
    super(props)
    this.createProject = this.createProject.bind(this)
  }

  componentWillMount() {
    this.props.fetchProjects()
  }

  createProject() {
    const value = window.prompt('Type title') || ''
    const title = value.trim()
    const slug = title
    title && slug && this.props.createProject({ title, slug })
  }

  render() {
    return (
      <nav>
        {this.props.auth.authenticated ? (
          <section>
            <button onClick={this.createProject}>+ New project</button>
            <Link to="/settings">Settings</Link>
            <Link to="/signout">Sign out</Link>
          </section>
        ) : (
          <section>
            <Link to="/signin">Sign in</Link>
          </section>
        )}
      </nav>
    )
  }
}

Nav.propTypes = propTypes

const mapStateToProps = ({ auth, projects }) => ({ auth, projects })
const mapDispatchToProps = dispatch =>
  bindActionCreators(projectActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
