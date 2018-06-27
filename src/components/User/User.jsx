import React from 'react'
import { bool, object } from 'prop-types'
import { connect } from 'react-redux'
import { match } from '../../utils'
import Grid from '../Grid'
import Profile from './Profile'
import Projects from '../Project/Projects'

const propTypes = { showNav: bool.isRequired, user: object.isRequired }

const User = ({ showNav, user }) =>
  user.uid ? (
    <Grid
      aside={showNav && <Profile {...user} />}
      main={<Projects user={user} />}
    />
  ) : null

User.propTypes = propTypes

const mapStateToProps = ({ app, auth, user }, ownProps) => ({
  showNav: !app.fullscreen,
  user: match(ownProps)(auth) ? auth.user : user.user
})

export default connect(mapStateToProps)(User)
