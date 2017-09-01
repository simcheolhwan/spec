import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Signin from './containers/Signin'
import Signout from './containers/Signout'
import Settings from './containers/Settings'
import ProjectCreate from './containers/ProjectCreate'
import User from './containers/User'

export default (
  <Switch>
    <Route path="/signin" component={Signin} />
    <Route path="/signout" component={Signout} />
    <Route path="/settings" component={Settings} />
    <Route path="/new" component={ProjectCreate} />
    <Route path="/:user" component={User} />
  </Switch>
)
