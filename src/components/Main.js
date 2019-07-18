import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './Main.css';
import Intro from './Intro';
import Home from './Home';


function Main({ location }) {
  return (
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300, exit: 300 }}
        classNames={'fade'}
      >
        <section className="route-section">
          <Switch location={location}>
            <Route exact path='/' component={Intro}></Route>
            <Route path='/home' component={Home}></Route>
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default withRouter(Main);
