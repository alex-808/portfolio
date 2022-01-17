import React, { Component } from 'react';
import './index.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

export class Hero extends Component {
  constructor(props) {
    super(props);
    Aos.init({ delay: 300, duration: 1500, easing: 'ease-in-out' });
  }
  render() {
    return (
      <section className="hero_section">
        <div className="hero_accent_box"></div>
        <div className="hero_texts">
          <h1 className="hero_title">{this.props.hero.title}</h1>
          <div data-aos="fade-up">{this.props.hero.text}</div>
        </div>
        <div className="hero_animation"></div>
      </section>
    );
  }
}

export default Hero;
