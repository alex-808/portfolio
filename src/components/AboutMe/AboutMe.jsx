import React, { Component } from 'react';
import './index.css';

export class AboutMe extends Component {
  render() {
    return (
      <section className="about_me_section">
        <h1 className="about_me_title">{this.props.about_me.title}</h1>
        <div className="about_me_text">{this.props.about_me.text}</div>
      </section>
    );
  }
}

export default AboutMe;