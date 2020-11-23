import React, { Component } from 'react';
import SpecializationItem from './SpecializationItem/SpecializationItem';
import './index.css';

export class SpecializationItems extends Component {
    render() {
        return this.props.items.map((item) => (
            <SpecializationItem item={item} />
        ));
    }
}

export default SpecializationItems;
