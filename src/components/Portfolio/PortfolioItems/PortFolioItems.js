import React, { Component } from 'react';
import './index.css';
import PortfolioItem from './PortfolioItem/PortfolioItem';
export class PortfolioItems extends Component {
  render() {
    return this.props.projects.map((project, i) => (
      <PortfolioItem project={project} key={i} />
    ));
  }
}

export default PortfolioItems;
