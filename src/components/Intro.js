import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';
import ParticleComponent from './ParticleComponent';
import Typing from 'react-typing-animation';
import { AwesomeButton } from 'react-awesome-button';
import "./buttonStyles.css";


class Button extends Component {
	componentWillMount() {
    var that = this;
    this.setState({visibility: "hidden"});
		setTimeout(function() {
			that.show();
		}, that.props.wait);
	}
	show() {
		this.setState({visibility: "visible"});
	}
  render() {
        return (
          <div className="button" style={{visibility: this.state.visibility}}>
              <AwesomeButton size={150} type="primary"><Link style={{ textDecoration: 'none', color: 'black' }} to='/home'>Begin</Link></AwesomeButton>
          </div>
        )
    }
};


export default class Intro extends Component {
  render() {
    return (
      <div className="content">
        <div className="centered">
          <ParticleComponent />
          <Typing className="header"
                  speed={100}
                  >
            Welcome
            <Typing.Delay ms={2000} />
          </Typing>
          <div className="centered">
            <Button wait={1100} />
          </div>
        </div>
      </div>
    );
  };
}
