import React, {Component} from 'react';
//not used bc image blocking prevents onmouseover event from triggering

export default class MouseCursor extends Component {
  render() {
    return (
      <div style={{padding:0, left: this.props.posX-25, top: this.props.posY-25, position: 'absolute'}}>
        <img className="cursorImg" src='https://d2wg2diq3xdth6.cloudfront.net/handCursor.png' alt="cursor" style={{maxWidth:50}}/>
      </div>
    );
  };
}
