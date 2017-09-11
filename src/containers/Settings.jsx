import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateUser } from '../actions/auth'
import { sanitize } from '../helpers/utils'
import Page from '../components/Page'
import SettingsForm from './SettingsForm'

const propTypes = {
  user: PropTypes.object.isRequired,
  state: PropTypes.oneOf(['idle', 'auth', 'user']).isRequired,
  error: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired
}

const Settings = ({ user, state, error, onUpdate }) => {
  const ui = {
    idle: null,
    auth: <Redirect to="/signin" />,
    user: (
      <Page title="Public Profile">
        <SettingsForm
          initialValues={user}
          onSubmit={updates => onUpdate(user.uid, sanitize(updates))}
          submitButton="Update profile"
          errorMessage={error.message}
        />
      </Page>
    )
  }

  return ui[state]
}

Settings.propTypes = propTypes

const mapStateToProps = ({ auth }) => auth
const mapDispatchToProps = dispatch => ({
  onUpdate: (uid, updates) => dispatch(updateUser(uid, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
