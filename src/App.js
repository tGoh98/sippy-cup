import React, {Component} from 'react';
import './App.css';
import ReactTypingEffect from 'react-typing-effect';
import Mug from './Mug';
import MouseCursor from './MouseCursor';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { x: 0, y: 0 };
  }

  _onMouseMove(e) {
    this.setState({ x: e.clientX, y: e.clientY });
  }

  render() {
    const { x, y } = this.state;
    return (
      <div
        id="canvas"
        onMouseMove={this._onMouseMove.bind(this)}
        >
        <MouseCursor posX={this.state.x} posY={this.state.y}/>
        <h1>
        <ReactTypingEffect
          text={[""]}
          speed={100}
          eraseDelay={1000}
        />
        </h1>
        <Mug />
        <p>Mouse coordinates: { x } { y }</p>
      </div>
    );
  };
}
