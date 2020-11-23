import React, { Component } from 'react';
import './index.css';

export class PortfolioItem extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="proj_container">
                <div className="proj_box_img"></div>
                <div className={this.props.project.side_class}>
                    <div className="proj_title_container">
                        <h3 className="proj_title">
                            {this.props.project.title}
                        </h3>
                        <div className="port_accent_container">
                            <div className="port_accent"></div>
                        </div>
                    </div>
                    <div className="proj_img_container">
                        <img
                            className="proj_img"
                            src={this.props.project.img}
                        />
                        <div className="proj_img_tab"></div>
                    </div>
                    <p className="proj_text">{this.props.project.text}</p>
                </div>
                <div className="port_divider"></div>
            </div>
        );
    }
}

export default PortfolioItem;
