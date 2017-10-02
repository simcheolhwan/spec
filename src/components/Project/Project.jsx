import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route, Link } from 'react-router-dom'
import { fetchFeatures } from '../../actions/featureActions'
import { fetchSpecs } from '../../actions/specActions'
import { match, getProject } from '../../utils'
import { colors } from '../../styles'
import NotFound from '../NotFound'
import Grid from '../Grid'
import ProjectUpdate from './ProjectUpdate'
import Features from '../Feature/Features'

const propTypes = {
  state: PropTypes.oneOf(['idle', 'project', 404]),
  project: PropTypes.object,
  isOwner: PropTypes.bool.isRequired,
  action: PropTypes.shape({
    fetchFeatures: PropTypes.bool.isRequired
  }).isRequired,
  fetchFeatures: PropTypes.func.isRequired,
  fetchSpecs: PropTypes.func.isRequired
}

const defaultProps = {
  project: {}
}

class Project extends Component {
  componentWillMount() {
    this.fetch(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.fetch(nextProps)
  }

  fetch = ({ user, projectKey, action, fetchFeatures, fetchSpecs }) => {
    const { uid } = user
    action.fetchFeatures && fetchFeatures(uid, projectKey)
    action.fetchFeatures && fetchSpecs(uid, projectKey)
  }

  render() {
    const { state, action, project, isOwner, user, match } = this.props
    const { name, slug } = user

    const breadcrumb = {
      user: (
        <Link to={'/' + slug} style={style.Link}>
          {name}
        </Link>
      ),

      project: (
        <Link to={match.url} style={style.Link}>
          {project.title}
        </Link>
      )
    }

    const menu = {
      setting: (
        <Link to={match.url + '/settings'} style={style.Link}>
          Setting
        </Link>
      )
    }

    const grid = {
      aside: (
        <nav>
          <h1>
            {breadcrumb.user}/{breadcrumb.project}
          </h1>
          {isOwner && menu.setting}
        </nav>
      ),

      main: (
        <Switch>
          {!action.fetchFeatures && (
            <Route path={match.path} exact component={Features} />
          )}
          <Route path={match.path + '/settings'} component={ProjectUpdate} />
        </Switch>
      )
    }

    const ui = {
      idle: null,
      project: <Grid {...grid} />,
      404: <NotFound />
    }

    return ui[state]
  }
}

Project.propTypes = propTypes
Project.defaultProps = defaultProps

const style = {
  Link: { color: colors.black }
}

const mapStateToProps = (_state, ownProps) => {
  const { auth, user: _user, projects, features } = _state
  const isOwner = match(ownProps)(auth)
  const { user } = isOwner ? auth : _user
  const { projectKey, project } = getProject(ownProps)(projects)
  const matchProject = projectKey === features.project
  const state =
    projects.state === 'idle' ? 'idle' : projectKey ? 'project' : 404
  const action = { fetchFeatures: !matchProject && !!user.uid && !!projectKey }

  return { state, action, user, projectKey, project, isOwner }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchFeatures, fetchSpecs }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Project)
