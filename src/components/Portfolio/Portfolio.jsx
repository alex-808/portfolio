import React, { Component } from 'react';
import './index.css';
import PortfolioItems from './PortfolioItems/PortfolioItems';

export class Portfolio extends Component {
  render() {
    return (
      <section className="port_section">
        <h1 className="port_title">{this.props.port.port_title}</h1>
        <div className="port_title_underline"></div>
        <div className="port_container">
          <PortfolioItems projects={this.props.port.projects} />
        </div>
      </section>
    );
  }
}

export default Portfolio;
