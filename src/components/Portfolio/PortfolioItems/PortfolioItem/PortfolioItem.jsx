import React from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const PortfolioItem = ({
    project = {
        title: '',
        side_class: '',
        accentColor: '',
        img: '',
        text: '',
    },
}) => {
    project.links = project.links || [];

    Aos.init({ offset: 0, duration: 1500, easing: 'ease-in-out' });

    const slideDir = project.side_class?.includes('port_right')
        ? 'left'
        : 'right';
    return (
        <div data-aos={`slide-${slideDir}`} className="proj_container">
            <div className="proj_box_img"></div>
            <div className={project.side_class}>
                <div className="proj_title_container">
                    <h3 className="proj_title">{project.title}</h3>
                    <div className="port_accent_container">
                        <div
                            className={`port_accent-${project.accentColor}`}
                        ></div>
                    </div>
                </div>
                <div className="proj_img_container">
                    <img
                        className="proj_img"
                        src={project.img}
                        alt="Project on computer screen"
                    />
                    <div className="proj_img_tab"></div>
                </div>
                <div className="proj_text">
                    {project.text}
                    <div className="proj_links">
                        {project.links.map((link, i) => (
                            <a href={link.url} key={i}>
                                {link.text}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="port_divider"></div>
            <div className={`proj_animation_${slideDir}`}></div>
        </div>
    );
};

export default PortfolioItem;
