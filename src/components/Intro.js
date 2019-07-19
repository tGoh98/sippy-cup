import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';
import ParticleComponent from "./particleComponent";
import Typist from 'react-typist';


export default class Intro extends Component {
  render() {
    return (
      <div>
        <Link to='/home'>next</Link>
        <ParticleComponent />
        <div className="centered">
          <Typist className="header"
                  avgTypingDelay={80}
                  startDelay={1500}
                  cursor={{hideWhenDone: true}}>
            asdf
          </Typist>
        </div>
      </div>
    );
  };
}
