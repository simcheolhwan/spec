import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { checkAuth } from '../actions/auth'
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
      <Router>
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
