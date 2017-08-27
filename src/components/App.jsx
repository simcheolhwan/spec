import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Signin from '../containers/Signin'

const App = () =>
  <Router>
    <main>
      <Route exact path="/signin" component={Signin} />
    </main>
  </Router>

export default App
