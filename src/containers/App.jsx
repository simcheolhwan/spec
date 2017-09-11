import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ConnectedRouter as Router } from 'react-router-redux'
import { checkAuth } from '../actions/auth'
import history from '../history'
import routes from '../routes'
import Nav from './Nav'

const propTypes = {
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
          <main>{routes}</main>
        </div>
      </Router>
    )
  }
}

App.propTypes = propTypes

const mapDispatchToProps = dispatch =>
  bindActionCreators({ checkAuth }, dispatch)

export default connect(null, mapDispatchToProps)(App)
