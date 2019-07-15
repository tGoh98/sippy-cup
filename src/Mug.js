import React, {Component} from 'react';
import './Mug.css';
import mug from './assets/mug.png';

export default class Mug extends Component {
  render() {
    return (
      <div>
        <img className="CenterImg" src={mug} alt="mug" />
      </div>
    );
  };
}
