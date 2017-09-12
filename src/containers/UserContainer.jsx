import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { readUser } from '../actions/user'
import User from './User'
import Project from './Project'

const propTypes = {
  state: PropTypes.oneOf(['idle', 'projects', 404]),
  read: PropTypes.bool,
  readUser: PropTypes.func.isRequired
}

const defaultProps = {
  read: false
}

class UserContainer extends Component {
  componentWillMount() {
    const { read, readUser, match } = this.props
    read && readUser(match.params.user)
  }

  render() {
    const { state, match: { path } } = this.props

    const ui = {
      idle: <article>Fetching...</article>,
      projects: (
        <Switch>
          <Route path={path} exact component={User} />
          <Route path={path + '/:project'} component={Project} />
        </Switch>
      ),
      404: (
        <article>
          <h1>Not Found</h1>
        </article>
      )
    }

    return ui[state]
  }
}

UserContainer.propTypes = propTypes
UserContainer.defaultProps = defaultProps

const mapStateToProps = ({ auth, projects, user }, ownProps) => {
  const { user: slug } = ownProps.match.params

  const stateByUser = {
    idle: { state: 'idle', read: true },
    404: { state: 404 },
    projects:
      slug === user.user.slug
        ? { state: 'projects' }
        : { state: 'idle', read: true }
  }

  const stateByProjects = {
    idle: { state: 'idle' },
    projects: { state: 'projects' }
  }

  const state = {
    auth: stateByUser[user.state],
    user:
      slug === auth.user.slug
        ? stateByProjects[projects.state]
        : stateByUser[user.state]
  }

  return state[auth.state]
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ readUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
