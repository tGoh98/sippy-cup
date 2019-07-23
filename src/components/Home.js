import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Mug from './Mug';
import MouseMug from './MouseMug';
import blank from '../assets/blank.png';
import mugSpill from '../assets/mugSpill.png';
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
                  mousePosArr: Array(300).fill(0), // Adjust num tracked here
                  res: 'none',
                  model: '',
                  showContent: false,
                  numWritten: 0
                 };
  }

  async componentDidMount() {
    // Set sampling interval
    this.timerID = setInterval(() => this.sampleMousePos(), 10); // Adjust sampling interval here

    // Load js model
    this.model = await tf.loadLayersModel('https://d2wg2diq3xdth6.cloudfront.net/ModelJSOld/model.json');
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

    // Increment counter
    this.setState({numWritten: this.state.numWritten+1 })
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
    const { x, y, res, numWritten } = this.state;
    return (
      <div className="windowContent">
      <Typing className="instructions"
              speed={1}
              onFinishedTyping={() => this.setState({showContent: true})}
              >
        <p>Welcome to Sippy Cup, a machine learning application.</p>
        <Typing.Delay ms={250} />
        <p>Use your cursor to try and pick up the mug.</p>
        <Typing.Delay ms={250} />
        <p>A neural network will analyze the velocity and trajectory of the cursor<br />
          to determine whether the mug is being picked up or accidentally spilled.</p>
        <Typing.Delay ms={250} />
      </Typing>

        { this.state.showContent &&
          <div className="fadein">
            <AwesomeButton className="buttonReset" type="primary" onPress={() => this.setState({res: 'none'})}>Reset</AwesomeButton>
            <div className="canvas"
              onMouseMove={this._onMouseMove.bind(this)}
            >
            { this.state.res === 'none' &&
              <Mug mouseEntered={() => this.detRes(this.state.mousePosArr)}/>
              // <Mug mouseEntered={() => this.addMouseCoords(this.state.mousePosArr)}/>
            }
            { this.state.res === 'hold' &&
              <div>
                <img className="CenterImg" src={blank} alt="blank" />
                <MouseMug posX={this.state.x} posY={this.state.y} />
              </div>
            }
            { this.state.res === 'spill' &&
              <img className="CenterImg" src={mugSpill} alt="spilled mug" />
            }
            <br />
            <p style={{ textAlign: 'center' }}>Result: { res }</p>
            </div>
            {/*<p>numWritten: { numWritten }</p>*/}
          </div>
        }
        {/*
          <p>Mouse coordinates: { x } { y }</p>
          <Link className="pathLink" to='/'>go back</Link>
        */}
      </div>
    );
  };
}
