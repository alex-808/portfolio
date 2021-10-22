import React, { Component } from 'react';
import './index.css';

export class SocialIcon extends Component {
  render() {
    return (
      <a href={this.props.link}>
        <img className="social_icon" src={this.props.img} />
      </a>
    );
  }
}

export default SocialIcon;
