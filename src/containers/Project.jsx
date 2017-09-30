import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import { getProject } from '../utils'
import Grid from '../components/Grid'
import Features from './Features'
import ProjectUpdate from './ProjectUpdate'

const propTypes = {
  project: PropTypes.object,
  isOwned: PropTypes.bool.isRequired
}

const defaultProps = {
  project: {}
}

const Project = ({ project, isOwned, user: { name, slug }, match }) =>
  _.isEmpty(project) ? (
    <article>Not found</article>
  ) : (
    <Grid
      aside={
        <nav>
          <h1>
            <Link to={'/' + slug}>{name}</Link>
            /<Link to={match.url}>{project.title}</Link>
          </h1>
          {isOwned && <Link to={match.url + '/settings'}>Setting</Link>}
        </nav>
      }
      main={
        <Switch>
          <Route path={match.path} exact component={Features} />
          <Route path={match.path + '/settings'} component={ProjectUpdate} />
        </Switch>
      }
    />
  )

Project.propTypes = propTypes
Project.defaultProps = defaultProps

const mapStateToProps = (state, ownProps) => getProject(state, ownProps)

export default connect(mapStateToProps)(Project)
