import React, { Component } from 'react';
import SpecializationItem from './SpecializationItem';

class Specializations extends Component {

    render() {
        console.log(this.props.texts)
        return (
            <div className="spec_section">
                <div className="spec_top fixed_background">
                </div>
                <div className="spec_content">
                    {this.props.texts.map((text) => {
                        console.log(text)
                        return <SpecializationItem text={text} />
                    })}
                </div>
    
    
        </div>
        )
    }
    
}

export default Specializations;