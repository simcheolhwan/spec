import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as authActions from '../actions/auth'
import Nav from './Nav'
import Signin from './Signin'
import Signout from './Signout'
import Settings from './Settings'
import Project from './Project'

const propTypes = {
  app: PropTypes.object.isRequired,
  checkAuth: PropTypes.func.isRequired
}

class App extends Component {
  componentWillMount() {
    this.props.checkAuth()
  }

  render() {
    return this.props.app.render
      ? <Router>
          <div>
            <aside>
              <Nav />
            </aside>

            <main>
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signout" component={Signout} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/:user/:project" component={Project} />
            </main>
          </div>
        </Router>
      : null
  }
}

App.propTypes = propTypes

const mapStateToProps = ({ app }) => ({ app })
const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
