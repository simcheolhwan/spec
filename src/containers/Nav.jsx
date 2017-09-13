import { connect } from 'react-redux'
import Nav from '../components/Nav'

const mapStateToProps = ({ auth, projects }) => {
  const states = {
    idle: auth.state,
    projects: 'projects'
  }

  const state = states[projects.state]

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

  return {
    title: 'Spec',
    links: links[state]
  }
}

export default connect(mapStateToProps)(Nav)
