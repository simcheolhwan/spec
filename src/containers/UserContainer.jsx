import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import * as userActions from '../actions/user'
import User from './User'
import Project from './Project'

const propTypes = {
  user: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
  readUser: PropTypes.func.isRequired
}

class UserContainer extends Component {
  componentWillMount() {
    const { user: slug } = this.props.match.params
    slug !== this.props.user.slug && this.props.readUser(slug)
  }

  render() {
    const { user, state, error } = this.props
    const { path } = this.props.match

    const ui = {
      idle: <article>Fetching...</article>,
      projects: user.uid ? (
        <Switch>
          <Route path={path} exact component={User} />
          <Route path={path + '/:project'} component={Project} />
        </Switch>
      ) : (
        <article>
          <h1>Not Found</h1>
        </article>
      ),
      error: <article>{error.code}</article>
    }

    return ui[state]
  }
}

UserContainer.propTypes = propTypes

const mapStateToProps = ({ user }) => user
const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
