import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Mug from './Mug';
import * as tf from '@tensorflow/tfjs';
import { AwesomeButton } from 'react-awesome-button';
import "./buttonStyles.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { x: 0,
                  y: 0,
                  mousePosArr: Array(300).fill(0),
                  res: 'none',
                  model: ''
                 };
  }

  async componentDidMount() {
    // Set sampling interval
    this.timerID = setInterval(() => this.sampleMousePos(), 10); // Adjust sampling interval here

    // Load js model
    this.model = await tf.loadLayersModel('http://d2wg2diq3xdth6.cloudfront.net/ModelJS/model.json');
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
    // FOR COLLECTING TRAINING DATA
    // SWAP WITH THIS STATEMENT
    // run "json-server --watch [dbname].json --port 8080" from terminal to start the file writing server
    // <Mug mouseEntered={() => this.addMouseCoords(this.state.mousePosArr)}/>

    // Write mouse position array to json file
    fetch('http://localhost:8080/coords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({mousePos: mousePosArr})
    }).then(response => response.json())
      .then(json => console.log(json));
  }

  detRes(mousePosArr) {
    // Determine hold or spill
    // Format data
    var xs = [];
    var ys = [];
    for (var i=0; i<mousePosArr.length; i++) {
      if (i%2 === 0) {
        ys.push(mousePosArr[i]);
      } else {
        xs.push(mousePosArr[i]);
      }
    }
    var input = [];
    input.push(xs);
    input.push(ys);
    var finalInput = [];
    finalInput.push(input);
    const pred = this.model.predict(tf.tensor(finalInput));
    // pred.print();
    const prediction = Array.from(pred.dataSync());
    if (parseInt(prediction) === 0) this.setState({res: 'spill'});
    else this.setState({res: 'hold'});
  }

  render() {
    const { x, y, res } = this.state;
    return (
      <div
        id="canvas"
        onMouseMove={this._onMouseMove.bind(this)}
        >
        <Mug mouseEntered={() => this.detRes(this.state.mousePosArr)}/>
        <p>Mouse coordinates: { x } { y }</p>
        <p>Result: { res }</p>
        <Link className="pathLink" to='/'>go back</Link><br />
        <AwesomeButton className="buttonReset" type="primary">Reset</AwesomeButton>
      </div>
    );
  };
}
