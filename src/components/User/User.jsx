import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { match } from 'utils'
import Grid from 'Grid'
import Profile from './Profile'
import Projects from 'Project/Projects'

const propTypes = {
  user: PropTypes.object.isRequired
}

const User = ({ user }) =>
  user.uid ? (
    <Grid aside={<Profile {...user} />} main={<Projects user={user} />} />
  ) : null

User.propTypes = propTypes

const mapStateToProps = ({ auth, user }, ownProps) => ({
  user: match(ownProps)(auth) ? auth.user : user.user
})

export default connect(mapStateToProps)(User)
