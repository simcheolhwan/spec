import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const propTypes = {
  user: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired
}

const Projects = ({ user, projects }) => {
  return projects.order ? (
    <ul>
      {projects.order.map(key => (
        <li key={key}>
          <Link to={`/${user.slug}/${projects.list[key].slug}`}>
            {projects.list[key].title}
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <p>No Projects</p>
  )
}

Projects.propTypes = propTypes

const mapStateToProps = ({ user }) => user

export default connect(mapStateToProps)(Projects)
