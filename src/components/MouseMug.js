import React, {Component} from 'react';
import cup1 from '../assets/cup1.png';

export default class MouseMug extends Component {
  render() {
    return (
      <div style={{padding:0, left: this.props.posX-220, top: this.props.posY-110, position: 'absolute'}}>
        <img src={ cup1 } style={{ maxWidth: 260 }} alt="mug"/>
      </div>
    );
  };
}
