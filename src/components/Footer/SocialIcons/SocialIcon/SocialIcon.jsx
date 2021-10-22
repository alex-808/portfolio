import React, { Component } from 'react';
import './index.css';

export class SocialIcon extends Component {
    render() {
        return <img className="social_icon" src={this.props.icon} />;
    }
}

export default SocialIcon;
