import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import ProjectUpdate from './ProjectUpdate'

const propTypes = {
  project: PropTypes.object,
  isOwned: PropTypes.bool.isRequired
}

const defaultProps = {
  project: {}
}

const Project = ({ project, isOwned, match }) =>
  _.isEmpty(project) ? (
    <article>Not found</article>
  ) : (
    <article>
      <h1>{project.title}</h1>
      {isOwned && <Link to={match.url + '/settings'}>Setting</Link>}

      <Switch>
        <Route path={match.path + '/settings'} component={ProjectUpdate} />
      </Switch>
    </article>
  )

Project.propTypes = propTypes
Project.defaultProps = defaultProps

const mapStateToProps = ({ auth, user }, ownProps) => ({
  project: _.find(user.projects.list, ['slug', ownProps.match.params.project]),
  isOwned: auth.user.uid === user.user.uid
})

export default connect(mapStateToProps)(Project)
