import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';

export default class Intro extends Component {
  render() {
    return (
      <div>
        <Link to='/home'>next</Link>
      </div>
    );
  };
}
