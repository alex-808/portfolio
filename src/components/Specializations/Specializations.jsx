import React from 'react';
import SpecializationItems from './SpecializationItems/SpecializationItems';
import './index.css';

const Specializations = ({ spec }) => {
  return (
    <section className="spec_section">
      <div className="spec_header_box"></div>
      <div className="spec_item_container">
        <SpecializationItems items={spec.items} />
      </div>
    </section>
  );
};

export default Specializations;
