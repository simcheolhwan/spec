import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '../components/Grid'
import Profile from './Profile'
import Projects from './Projects'

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

const mapStateToProps = ({ user }) => user

export default connect(mapStateToProps)(User)
