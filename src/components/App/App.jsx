import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ConnectedRouter as Router } from 'react-router-redux'
import { checkAuth } from '../../actions/authActions'
import history from '../../history'
import routes from '../../routes'
import Nav from './NavContainer'

const propTypes = {
  state: PropTypes.oneOf(['idle', 'guest', 'user']).isRequired,
  checkAuth: PropTypes.func.isRequired
}

class App extends Component {
  componentWillMount() {
    this.props.checkAuth()
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Nav />
          <main>{this.props.state !== 'idle' && routes}</main>
        </div>
      </Router>
    )
  }
}

App.propTypes = propTypes

const mapStateToProps = ({ auth: { state } }) => ({ state })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ checkAuth }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
