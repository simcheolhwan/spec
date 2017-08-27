import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as authActions from '../actions/auth'
import Signin from './Signin'
import Signout from './Signout'

class App extends Component {
  componentWillMount() {
    this.props.checkAuth()
  }

  render() {
    return this.props.app.render
      ? <Router>
          <main>
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signout" component={Signout} />
          </main>
        </Router>
      : null
  }
}

const mapStateToProps = ({ app }) => ({ app })
const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
