import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Signin from 'Auth/Signin'
import Signout from 'Auth/Signout'
import Settings from 'Auth/Settings'
import ProjectCreate from 'Project/ProjectCreate'
import UserContainer from 'User/UserContainer.jsx'

export default (
  <Switch>
    <Route path="/signin" component={Signin} />
    <Route path="/signout" component={Signout} />
    <Route path="/settings" component={Settings} />
    <Route path="/new" component={ProjectCreate} />
    <Route path="/:user" component={UserContainer} />
  </Switch>
)
