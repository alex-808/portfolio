import React, { Component } from 'react';
import './index.css';

export class AboutMe extends Component {
    render() {
        return (
            <section class="about_me_section">
                <h1 class="about_me_title">{this.props.about_me.title}</h1>
                <p class="about_me_text">{this.props.about_me.text}</p>
            </section>
        );
    }
}

export default AboutMe;
