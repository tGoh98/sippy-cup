import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import './Mug.css';
import mug from '../assets/mug.png';

export default class Mug extends Component {
  componentDidMount() {
    // console.log(ReactDOM.findDOMNode(this).getBoundingClientRect());
  }
  render() {
    return (
      <div>
        <img onMouseEnter={() => this.props.mouseEntered()} className="CenterImg" src={mug} alt="mug" />
      </div>
    );
  };
}
