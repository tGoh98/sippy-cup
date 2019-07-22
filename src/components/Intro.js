import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';
import ParticleComponent from './ParticleComponent';
import Typing from 'react-typing-animation';


export default class Intro extends Component {
  render() {
    return (
      <div className="centered">
        <ParticleComponent />
        <Typing className="header"
                speed={300}
                >
          asdf
          <Typing.Delay ms={10000} />
        </Typing>
        <div className="link">
          <Link style={{ textDecoration: 'none' }} to='/home'>next</Link>
        </div>
      </div>
    );
  };
}
