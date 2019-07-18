import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Intro from './Intro';
import Home from './Home';

const App = () => (
  <div>
    <Main />
  </div>
)

const Main = () => (
      <Switch>
        <Route exact path='/' component={Intro}></Route>
        <Route exact path='/home' component={Home}></Route>
      </Switch>
    );

export default App;
