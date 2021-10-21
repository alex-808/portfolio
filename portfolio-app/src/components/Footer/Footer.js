import React, { Component } from 'react';
import './index.css';
import SocialIcons from './SocialIcons/SocialIcons';

export class Footer extends Component {
  render() {
    console.log(this.props);
    return (
      <section className="footer_section">
        <div className="footer_accent">{this.props.footer.cta}</div>
        <div className="social_icons">
          <SocialIcons social_icons={this.props.footer.social_icons} />
        </div>
        <div className="footer_animation"></div>
      </section>
    );
  }
}

export default Footer;
