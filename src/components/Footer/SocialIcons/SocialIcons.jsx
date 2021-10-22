import React, { Component } from 'react';
import './index.css';
import SocialIcon from './SocialIcon/SocialIcon';

export class SocialIcons extends Component {
  render() {
    return this.props.social_icons.map((icon, i) => (
      <SocialIcon icon={icon} key={i} />
    ));
  }
}

export default SocialIcons;
