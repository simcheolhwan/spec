import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

const mapStateToProps = ({ user }, ownProps) => ({
  project: _.find(user.projects.list, ['slug', ownProps.match.params.project])
})

export default connect(mapStateToProps)(Project)
