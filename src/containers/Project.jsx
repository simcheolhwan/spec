import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as projectActions from '../actions/project'

const propTypes = {
  project: PropTypes.object
}

const defaultProps = {
  project: {}
}

const Project = ({ project }) =>
  _.isEmpty(project) ? (
    <article>Not found</article>
  ) : (
    <article>
      <h1>{project.title}</h1>
    </article>
  )

Project.propTypes = propTypes
Project.defaultProps = defaultProps

const mapStateToProps = ({ projects }, ownProps) => ({
  project: _.find(projects.list, ['slug', ownProps.match.params.project])
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(projectActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Project)
