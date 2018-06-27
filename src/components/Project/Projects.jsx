import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { colors } from '../../styles'
import Page from '../Page'
import Grid from '../Grid'

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

const Projects = ({ user, projects: { order, list } }) => {
  const renderGroup = type => (
    <ul style={style.list} key={type}>
      {group[type].map(renderList)}
    </ul>
  )

  const renderList = key => (
    <li key={key}>
      <Project {...list[key]} url={`/${user.slug}/${list[key].slug}`} />
    </li>
  )

  const reduceGroup = (acc, cur) =>
    Object.assign(
      acc,
      list[cur].isPrivate
        ? { isPrivate: [...acc.isPrivate, cur] }
        : { isPublic: [...acc.isPublic, cur] }
    )

  const group = order.reduce(reduceGroup, { isPublic: [], isPrivate: [] })

  return (
    <Page title="Projects">
      {order ? (
        <Grid main={['isPublic', 'isPrivate'].map(renderGroup)} />
      ) : (
        <p>No Projects</p>
      )}
    </Page>
  )
}

Projects.propTypes = propTypes

const style = {
  list: { flex: 1 },
  Project: { borderBottom: `1px solid ${colors.line}`, padding: '1rem 0' }
}

const mapStateToProps = ({ projects }) => ({ projects })

export default connect(mapStateToProps)(Projects)
