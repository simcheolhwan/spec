import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Signin from './components/Auth/Signin'
import Signout from './components/Auth/Signout'
import Settings from './components/Auth/Settings'
import ProjectCreate from './components/Project/ProjectCreate'
import UserContainer from './components/User/UserContainer.jsx'

export default (
  <Switch>
    <Route path="/signin" component={Signin} />
    <Route path="/signout" component={Signout} />
    <Route path="/settings" component={Settings} />
    <Route path="/new" component={ProjectCreate} />
    <Route path="/:user" component={UserContainer} />
  </Switch>
)
