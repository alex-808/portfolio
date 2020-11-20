import React, { Component } from 'react';
import './index.css';

export class Specializations extends Component {
    render() {
        return (
            <section class="port_section">
                <h1 class="port_title">Past Projects</h1>
                <div class="port_title_underline"></div>
                <div class="port_container">
                    <div class="proj_container">
                        <div class="proj_box_img"></div>
                        <div class="port_item port_left">
                            <div class="proj_title_container">
                                <h3 class="proj_title">Project Title</h3>
                                <div class="port_accent_container">
                                    <div class="port_accent"></div>
                                </div>
                            </div>
                            <div class="proj_img_container">
                                <img
                                    class="proj_img"
                                    src="imgs/mockup_yellow_cropped.png"
                                />
                                <div class="proj_img_tab"></div>
                            </div>
                            <p class="proj_text">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Cras nibh magna, condimentum
                                non pulvinar nec, semper vel ipsum. Nulla
                                facilisi. Suspendisse potent
                            </p>
                        </div>
                    </div>
                    <div class="port_divider"></div>
                    <div class="proj_container">
                        <div class="proj_box_img"></div>
                        <div class="port_item port_right">
                            <div class="proj_title_container">
                                <h3 class="proj_title">Project Title</h3>
                                <div class="port_accent_container">
                                    <div class="port_accent"></div>
                                </div>
                            </div>
                            <div class="proj_img_container">
                                <img
                                    class="proj_img"
                                    src="imgs/mockup_yellow_cropped.png"
                                />
                                <div class="proj_img_tab"></div>
                            </div>
                            <p class="proj_text">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Cras nibh magna, condimentum
                                non pulvinar nec, semper vel ipsum. Nulla
                                facilisi. Suspendisse potent
                            </p>
                        </div>
                    </div>
                    <div class="port_divider"></div>
                </div>
                {/* <!-- <div id="port_animation"></div> --> */}
            </section>
        );
    }
}

export default Specializations;
