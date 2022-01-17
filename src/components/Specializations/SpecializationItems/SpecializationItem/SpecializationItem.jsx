import React, { Component } from 'react';
import './index.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

export class SpecializationItem extends Component {
  constructor(props) {
    super(props);
    Aos.init({ offset: 0, duration: 300, easing: 'ease-in-out' });
  }
  render() {
    return (
      <div data-aos="flip-left" className="spec_item">
        <div className="spec_icon_bg">
          <img className="spec_icon" src={this.props.item.icon_url} />
        </div>
        <h2 className="spec_title">{this.props.item.title}</h2>
        {this.props.item.text}
      </div>
    );
  }
}

export default SpecializationItem;
