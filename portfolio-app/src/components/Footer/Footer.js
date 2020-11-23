import React, { Component } from 'react';
import './index.css';

export class AboutMe extends Component {
    render() {
        return (
            <section className="footer_section">
                <div className="footer_accent">Call to Action</div>
                <div className="social_icons">
                    <img className="social_icon" src="imgs/checkmark.svg" />
                    <img className="social_icon" src="imgs/checkmark.svg" />
                    <img className="social_icon" src="imgs/checkmark.svg" />
                </div>
                <div class="footer_animation"></div>
            </section>
        );
    }
}

export default AboutMe;
