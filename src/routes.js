import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Signin from './containers/Signin'
import Signout from './containers/Signout'
import Settings from './containers/Settings'
import Project from './containers/Project'

export default (
  <Switch>
    <Route path="/signin" component={Signin} />
    <Route path="/signout" component={Signout} />
    <Route path="/settings" component={Settings} />
    <Route path="/:user/:project" component={Project} />
  </Switch>
)
