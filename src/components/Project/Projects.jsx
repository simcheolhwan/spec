import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { colors } from 'styles'
import Page from 'Page'

const propTypes = {
  user: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired
}

const Project = ({ title, slug, url }) => (
  <article style={style.Project}>
    <h2>
      <Link to={url}>{title}</Link>
    </h2>
    <p>
      <code>{slug}</code>
    </p>
  </article>
)

const Projects = ({ user, projects }) => (
  <Page title="Projects">
    {projects.order ? (
      <ul style={style.list}>
        {projects.order.map(key => (
          <li key={key}>
            <Project
              {...projects.list[key]}
              url={`/${user.slug}/${projects.list[key].slug}`}
            />
          </li>
        ))}
      </ul>
    ) : (
      <p>No Projects</p>
    )}
  </Page>
)

Projects.propTypes = propTypes

const style = {
  list: { listStyle: 'none', padding: 0 },
  Project: { borderBottom: `1px solid ${colors.line}`, padding: '1rem 0' }
}

const mapStateToProps = ({ projects }) => ({ projects })

export default connect(mapStateToProps)(Projects)
