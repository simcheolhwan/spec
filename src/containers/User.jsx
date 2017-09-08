import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '../components/Grid'
import Profile from '../components/Profile'
import Projects from '../components/Projects'

const propTypes = {
  user: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired
}

const User = ({ user, projects }) => (
  <Grid
    aside={<Profile {...user} />}
    main={<Projects user={user} projects={projects} />}
  />
)

User.propTypes = propTypes

const mapStateToProps = ({ auth, projects, user }, ownProps) =>
  ownProps.match.params.user === auth.user.slug
    ? { user: auth.user, projects }
    : user

export default connect(mapStateToProps)(User)
