import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { fetchUser } from '../../actions/userActions'
import { fetchProjects } from '../../actions/projectActions'
import NotFound from '../NotFound'
import User from './User'
import Project from '../Project/Project'

const propTypes = {
  state: PropTypes.oneOf(['idle', 'user', 404]),
  user: PropTypes.object.isRequired,
  action: PropTypes.shape({
    fetchUser: PropTypes.bool.isRequired,
    fetchProjects: PropTypes.bool.isRequired
  }).isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired
}

class UserContainer extends Component {
  componentWillMount() {
    this.fetch(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.fetch(nextProps)
  }

  fetch = ({ user, action, fetchUser, fetchProjects }) => {
    action.fetchUser && fetchUser(user.slug)
    action.fetchProjects && fetchProjects(user.uid)
  }

  render() {
    const { state, match: { path } } = this.props

    const ui = {
      idle: null,

      user: (
        <Switch>
          <Route path={path} exact component={User} />
          <Route path={path + '/:project'} component={Project} />
        </Switch>
      ),

      404: <NotFound />
    }

    return ui[state]
  }
}

UserContainer.propTypes = propTypes

const mapStateToProps = ({ auth, user, projects }, ownProps) => {
  const { user: slug } = ownProps.match.params
  const matchAuth = slug === auth.user.slug
  const matchUser = slug === user.user.slug
  const uid = matchAuth ? auth.user.uid : matchUser ? user.user.uid : undefined
  const matchProjects = uid === projects.user
  const state = matchAuth ? auth.state : user.state
  const userNotFound = state === 404

  return {
    state,
    user: { slug, uid },
    action: {
      fetchUser: !matchAuth && !matchUser && !userNotFound,
      fetchProjects: !matchProjects && !!uid
    }
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchUser, fetchProjects }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
