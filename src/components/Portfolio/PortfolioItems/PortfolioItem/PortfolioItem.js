import React, { Component } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './index.css';

export class PortfolioItem extends Component {
  constructor(props) {
    super(props);
    Aos.init({ offset: 0, duration: 1500, easing: 'ease-in-out' });

    if (props.project.side_class.includes('port_right')) {
      this.slideDir = 'left';
    } else {
      this.slideDir = 'right';
    }
  }
  render() {
    return (
      <div data-aos={`slide-${this.slideDir}`} className="proj_container">
        <div className="proj_box_img"></div>
        <div className={this.props.project.side_class}>
          <div className="proj_title_container">
            <h3 className="proj_title">{this.props.project.title}</h3>
            <div className="port_accent_container">
              <div className="port_accent"></div>
            </div>
          </div>
          <div className="proj_img_container">
            <img className="proj_img" src={this.props.project.img} />
            <div className="proj_img_tab"></div>
          </div>
          <div className="proj_text">{this.props.project.text}</div>
        </div>
        <div className="port_divider"></div>
        <div className={`proj_animation_${this.slideDir}`}></div>
      </div>
    );
  }
}

export default PortfolioItem;
