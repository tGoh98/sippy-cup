import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';
import Particle from './Particle';
import Typing from 'react-typing-animation';
import { AwesomeButton } from 'react-awesome-button';
import "./buttonStyles.css";
import "react-awesome-button/dist/styles.css"


export default class Intro extends Component {
	constructor(props) {
    super(props);

    this.state = { showButton: false };
  }

  render() {
    return (
      <div className="content">
        <div className="centered">
          <Particle />
          <Typing className="header"
                  speed={80}
									onFinishedTyping={() => this.setState({showButton:true})}
                  >
            Welcome to Sippy Cup
            <Typing.Delay ms={500} />
          </Typing>
          { this.state.showButton &&
						<div className="centered fadein">
						<AwesomeButton className="buttonBegin" type="primary"><Link className="linkText" to='/home'>Begin</Link></AwesomeButton>
						</div>
					}
        </div>
      </div>
    );
  };
}
