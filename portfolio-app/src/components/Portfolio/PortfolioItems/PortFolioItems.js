import React, { Component } from 'react';
import './index.css';
import PortfolioItem from './PortfolioItem/PortfolioItem';
export class PortfolioItems extends Component {
    render() {
        return this.props.projects.map((project) => (
            <PortfolioItem project={project} />
        ));
    }
}

export default PortfolioItems;
