import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Mug from './Mug';
import MouseMug from './MouseMug';
import blank from '../assets/blank.png';
import mugSpilled from '../assets/mugSpilled.png';
import * as tf from '@tensorflow/tfjs';
import { AwesomeButton } from 'react-awesome-button';
import "./buttonStyles.css";
import "react-awesome-button/dist/styles.css"
import Typing from 'react-typing-animation';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { x: 0,
                  y: 0,
                  mousePosArr: Array(300).fill(0), // change to 200
                  res: 'none',
                  model: '',
                  showContent: false
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
      <div className="windowContent">
      <Typing className="instructions"
              speed={20}
              onFinishedTyping={() => this.setState({showContent: true})}
              >
        <p>Welcome to Sippy Cup, a machine learning application.</p>
        <Typing.Delay ms={500} />
        <p>Use your cursor to try and pick up the mug.</p>
        <Typing.Delay ms={500} />
        <p>A neural network will analyze the velocity and trajectory of the cursor<br />
          to determine whether the mug is being picked up or accidentally spilled.</p>
        <Typing.Delay ms={500} />
      </Typing>

        { this.state.showContent &&
          <div>
            <AwesomeButton className="buttonReset" type="primary" onPress={() => this.setState({res: 'none'})}>Reset</AwesomeButton>
            <div className="canvas"
              onMouseMove={this._onMouseMove.bind(this)}
            >
            { this.state.res === 'none' &&
              <Mug mouseEntered={() => this.detRes(this.state.mousePosArr)}/>
            }
            { this.state.res === 'hold' &&
              <div>
                <img className="CenterImg" src={blank} alt="blank" />
                <MouseMug posX={this.state.x} posY={this.state.y} />
              </div>
            }
            { this.state.res === 'spill' &&
              <img className="CenterImg" src={mugSpilled} alt="spilled mug" />
            }
            </div>
          </div>
        }
        {/*
          <p>Mouse coordinates: { x } { y }</p>
          <p>Result: { res }</p>
          <Link className="pathLink" to='/'>go back</Link>
        */}
      </div>
    );
  };
}
