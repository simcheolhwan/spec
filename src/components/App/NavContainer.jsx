import findKey from 'lodash/fp/findKey'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/appActions'
import Nav from './Nav'

const findSyncing = findKey('isSyncing')

const mapStateToProps = ({ auth, projects, features, specs }) => {
  const syncing = !!(
    findSyncing(projects.list) ||
    findSyncing(features.list) ||
    findSyncing(specs.list)
  )

  const links = {
    idle: [],
    guest: [{ to: 'signin', label: 'Sign in' }],
    user: [
      { to: 'new', label: 'New project' },
      { to: auth.user.slug, label: 'Projects' },
      { to: 'settings', label: 'Settings' },
      { to: 'signout', label: 'Sign out' }
    ]
  }

  return {
    title: 'Spec',
    indicator: syncing,
    links: links[auth.state].filter(link => link.to)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
