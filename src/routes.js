import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Signin from './containers/Auth/Signin'
import Signout from './containers/Auth/Signout'
import Settings from './containers/Auth/Settings'
import ProjectCreate from './containers/Project/Create'
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
