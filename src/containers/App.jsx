import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import * as authActions from '../actions/auth'
import routes from '../routes'
import Nav from './Nav'

const propTypes = {
  app: PropTypes.object.isRequired,
  checkAuth: PropTypes.func.isRequired
}

class App extends Component {
  componentWillMount() {
    this.props.checkAuth()
  }

  render() {
    return this.props.app.render ? (
      <Router>
        <div>
          <Nav />
          <main>{routes}</main>
        </div>
      </Router>
    ) : null
  }
}

App.propTypes = propTypes

const mapStateToProps = ({ app }) => ({ app })
const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
