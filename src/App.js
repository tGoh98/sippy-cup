import React, {Component} from 'react';
import './App.css';
import ReactTypingEffect from 'react-typing-effect';
import Mug from './Mug';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { x: 0, y: 0, mousePosArr: Array(300).fill(0) };
  }

  componentDidMount() {
    // Set sampling interval
    this.timerID = setInterval(() => this.sampleMousePos(), 10); // Adjust sampling interval here
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  sampleMousePos() {
    // Log current mouse coordinates
    this.state.mousePosArr.push(this.state.x, this.state.y);
    this.state.mousePosArr.shift();
    this.state.mousePosArr.shift();
    // console.log(this.state.mousePosArr);
  }

  _onMouseMove(e) {
    // Update mouse coordinates
    this.setState({ x: e.clientX, y: e.clientY });
  }

  addMouseCoords(mousePosArr) {
    // Write mouse position array to db.json
    fetch('http://localhost:8080/coords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({mousePos: mousePosArr})
    }).then(response => response.json())
      .then(json => console.log(json));
  }

  render() {
    const { x, y } = this.state;
    return (
      <div
        id="canvas"
        onMouseMove={this._onMouseMove.bind(this)}
        >
        <h1>
        <ReactTypingEffect
          text={[""]}
          speed={100}
          eraseDelay={1000}
        />
        </h1>
        <Mug mouseEntered={() => this.addMouseCoords(this.state.mousePosArr)}/>
        <p>Mouse coordinates: { x } { y }</p>
      </div>
    );
  };
}
