import React, {Component} from 'react';
import cup1 from '../assets/cup1.png';
import cup2 from '../assets/cup2.png';
import cup3 from '../assets/cup3.png';
import cup4 from '../assets/cup4.png';

const images = [cup1, cup2, cup3, cup4];

export default class SpilledMug extends Component {
  constructor(props) {
    super(props);
    this.state = {index: 0, url: cup1};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.updateCup(),
      200
    );
  }

  updateCup() {
    const i = this.state.index;
    this.setState({
      url: images[i],
      index: i+1
    });
    if (i >= 3) clearInterval(this.timerID);
  }
  render() {
    return (
      <img className="CenterImg" src={this.state.url} alt="cup" />
    );
  };
}
