import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import * as userActions from '../actions/user'
import Profile from './Profile'
import Projects from './Projects'
import Project from './Project'

const propTypes = {
  user: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
  fetchUser: PropTypes.func.isRequired
}

class User extends Component {
  componentWillMount() {
    this.props.fetchUser(this.props.match.params.user)
  }

  render() {
    const { user, status, error } = this.props
    const { path } = this.props.match

    return error.code ? (
      <article>{error.code}</article>
    ) : status === 'fetching' ? (
      <article>Fetching...</article>
    ) : status === 'done' ? user.uid ? (
      <article>
        <Route path={path} exact component={Profile} />
        <Switch>
          <Route path={path} exact component={Projects} />
          <Route path={path + '/:project'} component={Project} />
        </Switch>
      </article>
    ) : (
      <article>
        <h1>Not Found</h1>
      </article>
    ) : null
  }
}

User.propTypes = propTypes

const mapStateToProps = ({ user }) => user
const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(User)
