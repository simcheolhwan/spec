import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { colors } from '../styles'
import Page from '../components/Page'

const propTypes = {
  user: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired
}

const Projects = ({ user, projects }) => {
  return (
    <Page title="Projects">
      {projects.order ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {projects.order.map(key => (
            <li style={style.item} key={key}>
              <h2>
                <Link to={`/${user.slug}/${projects.list[key].slug}`}>
                  {projects.list[key].title}
                </Link>
              </h2>
              <p>
                <code>{projects.list[key].slug}</code>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Projects</p>
      )}
    </Page>
  )
}

Projects.propTypes = propTypes

const style = {
  item: {
    borderBottom: colors.line,
    padding: '1rem 0'
  }
}

export default Projects
