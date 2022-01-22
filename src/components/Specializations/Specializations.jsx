import React from 'react';
import SpecializationItems from './SpecializationItems/SpecializationItems';
import './index.css';

const Specializations = ({ items = [] }) => {
  return (
    <section className="spec_section">
      <div className="spec_header_box"></div>
      <div className="spec_item_container">
        <SpecializationItems items={items} />
      </div>
    </section>
  );
};

export default Specializations;
