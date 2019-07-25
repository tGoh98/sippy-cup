import React, {Component} from 'react';
import cup1 from '../assets/cup1.png';

export default class MouseMug extends Component {
  render() {
    return (
      <div style={{padding:0, left: this.props.posX-160, top: this.props.posY-90, position: 'absolute'}}>
        <img src={ cup1 } style={{ maxWidth: 200 }} alt="mug"/>
      </div>
    );
  };
}
