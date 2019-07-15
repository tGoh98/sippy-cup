import React, {Component} from 'react';


export default class MouseCursor extends Component {
  render() {
    return (
      <div style={{padding:0, left: this.props.posX-50, top: this.props.posY-60, position: 'absolute'}}>
        <img className="cursorImg" src='https://d2wg2diq3xdth6.cloudfront.net/handCursor.png' alt="cursor"/>
      </div>
    );
  };
}
