import isEmpty from 'lodash/fp/isEmpty'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import { getProject } from '../../utils'
import { colors } from '../../styles'
import NotFound from '../../components/NotFound'
import Grid from '../../components/Grid'
import Update from './Update'
import Features from '../Feature/Features'

const propTypes = {
  project: PropTypes.object,
  isOwned: PropTypes.bool.isRequired
}

const defaultProps = {
  project: {}
}

const Project = ({ project, isOwned, user: { name, slug }, match }) => {
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
        {isOwned && menu.setting}
      </nav>
    ),

    main: (
      <Switch>
        <Route path={match.path} exact component={Features} />
        <Route path={match.path + '/settings'} component={Update} />
      </Switch>
    )
  }

  return isEmpty(project) ? <NotFound /> : <Grid {...grid} />
}

Project.propTypes = propTypes
Project.defaultProps = defaultProps

const style = {
  Link: { color: colors.black }
}

const mapStateToProps = (state, ownProps) => getProject(state, ownProps)

export default connect(mapStateToProps)(Project)
