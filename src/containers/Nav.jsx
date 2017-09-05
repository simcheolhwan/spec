import { connect } from 'react-redux'
import Nav from '../components/Nav'

const mapStateToProps = ({ auth }) => ({
  title: 'Spec',
  links: auth.authenticated
    ? [
        { to: 'new', label: 'New project' },
        { to: auth.user.slug, label: 'Projects' },
        { to: 'settings', label: 'Settings' },
        { to: 'signout', label: 'Sign out' }
      ]
    : [{ to: 'signin', label: 'Sign in' }]
})

export default connect(mapStateToProps)(Nav)
