import React, {Component} from 'react';
import mug from '../assets/mug.png';

export default class MouseMug extends Component {
  render() {
    return (
      <div style={{padding:0, left: this.props.posX-50, top: this.props.posY-60, position: 'absolute'}}>
        <img src={ mug } style={{ maxWidth: 100 }}alt="mug"/>
      </div>
    );
  };
}
