import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';
import ParticleComponent from './ParticleComponent';
import Typing from 'react-typing-animation';
import { AwesomeButton } from 'react-awesome-button';
import "./buttonStyles.css";


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
        <div className="centered">
          <AwesomeButton size={150} type="primary"><Link style={{ textDecoration: 'none', color: 'black' }} to='/home'>Begin</Link></AwesomeButton>
        </div>
      </div>
    );
  };
}
