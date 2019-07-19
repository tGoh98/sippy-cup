import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';
import ParticleComponent from "./particleComponent"
import ReactTypingEffect from 'react-typing-effect';


export default class Intro extends Component {
  render() {
    return (
      <div>
        <Link to='/home'>next</Link>
        <ParticleComponent />
        <div className="centered">
          <h1>
          <ReactTypingEffect
            text={[""]}
            speed={100}
            eraseDelay={1000}
          />
          </h1>
        </div>
      </div>
    );
  };
}
