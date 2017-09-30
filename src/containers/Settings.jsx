import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateUser } from '../actions/auth'
import { sanitize } from '../utils'
import Page from '../components/Page'
import SettingsForm from './SettingsForm'

const propTypes = {
  user: PropTypes.object.isRequired,
  state: PropTypes.oneOf(['idle', 'guest', 'user']).isRequired,
  error: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
}

const Settings = ({ user, state, updateUser }) => {
  const submit = updates => updateUser(user.uid, sanitize(updates))

  const ui = {
    guest: <Redirect to="/signin" />,
    user: (
      <Page title="Public Profile">
        <SettingsForm
          initialValues={user}
          onSubmit={submit}
          submitButton="Update profile"
        />
      </Page>
    )
  }

  return ui[state]
}

Settings.propTypes = propTypes

const mapStateToProps = ({ auth }) => auth
const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
