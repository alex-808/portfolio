import React, { Component } from 'react';
import './index.css';

export class SocialIcon extends Component {
    render() {
        return (
            <section className="footer_section">
                <div className="footer_accent">
                    {this.props.footer.footer_cta}
                </div>
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

export default SocialIcon;
