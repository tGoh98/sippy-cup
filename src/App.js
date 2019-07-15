import React, {Component} from 'react';
import './App.css';
import ReactTypingEffect from 'react-typing-effect';
import Mug from './Mug';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { x: 0, y: 0 };
  }

  _onMouseMove(e) {
    this.setState({ x: e.screenX, y: e.screenY });
  }

  render() {
    const { x, y } = this.state;
    return (
      <div onMouseMove={this._onMouseMove.bind(this)}>
        <h1>
        <ReactTypingEffect
          text={["Hello.", "World!"]}
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
