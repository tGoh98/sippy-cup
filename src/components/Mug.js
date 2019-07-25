import React, {Component} from 'react';
import cup1 from '../assets/cup1.png';

export default class Mug extends Component {
  render() {
    return (
      <div>
        <img onMouseEnter={() => this.props.mouseEntered()} className="MugImg" src={cup1} alt="mug" />
      </div>
    );
  };
}
