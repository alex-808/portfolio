import React, { Component } from 'react';
import './index.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './index.css';

export class SpecializationItem extends Component {
  constructor(props) {
    super(props);
    Aos.init({ offset: 0, duration: 700, easing: 'ease-in-out' });
  }
  render() {
    return (
      <div data-aos="flip-left" className="spec_item">
        <img className="spec_icon" src={this.props.item.icon_url} />
        <h2 className="spec_title">{this.props.item.title}</h2>
        {this.props.item.text}
      </div>
    );
  }
}

export default SpecializationItem;
