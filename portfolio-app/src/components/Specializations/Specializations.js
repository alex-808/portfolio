import React, { Component } from 'react';
import SpecializationItems from './SpecializationItems/SpecializationItems';
import './index.css';

export class Specializations extends Component {
    render() {
        return (
            <section className="spec_section">
                <div className="spec_header_box"></div>
                <div className="spec_item_container">
                    <SpecializationItems items={this.props.spec.items} />
                </div>
            </section>
        );
    }
}

export default Specializations;
