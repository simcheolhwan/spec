import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Signin from '../containers/Signin'
import Signout from '../containers/Signout'

const App = () =>
  <Router>
    <main>
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signout" component={Signout} />
    </main>
  </Router>

export default App
