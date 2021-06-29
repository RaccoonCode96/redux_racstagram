import React from 'react'
import { Router, Switch, Route } from 'react-router'
import Home from './pages/Home'
import Profile from './pages/Profile'
import User from './pages/User'

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/profile" exact component={Profile}/>
        <Route path="/user" exact component={User}/>

      </Switch>
    </Router>
  )
}

export default AppRotuer