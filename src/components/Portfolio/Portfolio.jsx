import React from 'react';
import './index.css';
import PortfolioItems from './PortfolioItems/PortfolioItems';

const Portfolio = ({ port = { projects: [], port_title: '' } }) => {
  port.projects = port.projects || [];
  return (
    <section className="port_section">
      <h1 className="port_title">{port.port_title}</h1>
      <div className="port_title_underline"></div>
      <div className="port_container">
        <PortfolioItems projects={port.projects} />
      </div>
    </section>
  );
};

export default Portfolio;
