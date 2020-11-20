import React, { Component } from 'react';
import './index.css';

export class Specializations extends Component {
    render() {
        return (
            <section className="spec_section">
                <div className="spec_header_box"></div>
                <div className="spec_item_container">
                    <div className="spec_item">
                        <img
                            className="spec_icon"
                            src="./imgs/fingerprint.svg"
                        />
                        <h2 className="spec_title">Who I am</h2>
                        <p className="spec_text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Cras nibh magna, condimentum non pulvinar nec,
                            semper vel ipsum. Nulla facilisi. Suspendisse potent
                        </p>
                    </div>
                    <div className="spec_item">
                        <img className="spec_icon" src="./imgs/code.svg" />
                        <h2 className="spec_title">What I do</h2>
                        <p className="spec_text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Cras nibh magna, condimentum non pulvinar nec,
                            semper vel ipsum. Nulla facilisi. Suspendisse potent
                        </p>
                    </div>
                    <div className="spec_item">
                        <img className="spec_icon" src="./imgs/checkmark.svg" />
                        <h2 className="spec_title">What I know</h2>
                        <p className="spec_text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Cras nibh magna, condimentum non pulvinar nec,
                            semper vel ipsum. Nulla facilisi. Suspendisse potent
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Specializations;
