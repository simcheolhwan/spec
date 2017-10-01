import findKey from 'lodash/fp/findKey'
import { connect } from 'react-redux'
import Nav from '../../components/App/Nav'

const findSyncing = findKey('isSyncing')

const mapStateToProps = ({ auth, projects, features, specs }) => {
  const syncing = !!(
    findSyncing(projects.list) ||
    findSyncing(features.list) ||
    findSyncing(specs.list)
  )

  const links = {
    idle: [],
    user: [],
    guest: [{ to: 'signin', label: 'Sign in' }],
    projects: [
      { to: 'new', label: 'New project' },
      { to: auth.user.slug, label: 'Projects' },
      { to: 'settings', label: 'Settings' },
      { to: 'signout', label: 'Sign out' }
    ]
  }

  const states = {
    idle: auth.state,
    projects: 'projects'
  }

  const state = states[projects.state]

  return {
    title: 'Spec',
    indicator: syncing,
    links: links[state]
  }
}

export default connect(mapStateToProps)(Nav)
