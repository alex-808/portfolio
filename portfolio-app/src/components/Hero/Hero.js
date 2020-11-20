import React, { Component } from 'react';
import './index.css';

export class Hero extends Component {
    render() {
        return (
            <section className="hero_section">
                <div className="hero_accent_box"></div>
                <div className="hero_texts">
                    <h1 className="hero_title">Hello,</h1>
                    <p className="hero_text">
                        My name is Alex and this is my website etc. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Cras nibh
                        magna, condimentum non pulvinar nec, semper vel ipsum.
                    </p>
                </div>
                <div className="hero_animation"></div>
            </section>
        );
    }
}

export default Hero;
