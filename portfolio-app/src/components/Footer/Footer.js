import React, { Component } from 'react';
import './index.css';

export class AboutMe extends Component {
    render() {
        return (
            <section class="footer_section">
                <div class="footer_accent">Call to Action</div>
                <div class="social_icons">
                    <img class="social_icon" src="imgs/checkmark.svg" />
                    <img class="social_icon" src="imgs/checkmark.svg" />
                    <img class="social_icon" src="imgs/checkmark.svg" />
                </div>
                <div id="footer_animation"></div>
            </section>
        );
    }
}

export default AboutMe;
