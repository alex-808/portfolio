import './App.css';
import LogRocket from 'logrocket';
import Hero from './components/Hero/Hero';
import Specializations from './components/Specializations/Specializations';
import Portfolio from './components/Portfolio/Portfolio';
import AboutMe from './components/AboutMe/AboutMe';
import Footer from './components/Footer/Footer';
import Animation from './components/Animation/Animation';
import { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        LogRocket.init('oxw2vq/portfolio');
        this.state = {
            hero: {
                title: 'Hello,',
                text: (
                    <p>
                        My name is Alex and this is my website. I am a{' '}
                        <b>self-taught developer</b> excited by the problems and
                        opportunities of the <b>modern web</b>. Take a look
                        around. Let me know if you see anything you like.{' '}
                        <b>Careful of the cubes.</b>
                    </p>
                ),
            },
            spec: {
                items: [
                    {
                        icon_url: './imgs/waving_hand.svg',
                        title: 'Who I am',
                        text: (
                            <div>
                                <p>
                                    I am a <b>self-taught developer</b>{' '}
                                    originally from Wisconsin but living in San
                                    Diego since 2019. Before that I lived in
                                    Massachusetts where I recieved a{' '}
                                    <b>B.A. in Communications</b> from{' '}
                                    <b>Clark University</b>. Grateful to be
                                    somewhere warm now.
                                </p>
                                <p>
                                    My interests aside from my{' '}
                                    <b>love of programming</b> are finding and
                                    making <b>weird music</b>, reading very{' '}
                                    <b>dry books</b>, trying to get outside once
                                    in a while and <b>talking to people</b> who
                                    are <b>much smarter</b> than me.
                                </p>
                            </div>
                        ),
                    },
                    {
                        icon_url: './imgs/auto_awesome.svg',
                        title: 'What I do',
                        text: (
                            <ul>
                                <li>
                                    Write <b>tests</b>
                                </li>
                                <li>
                                    Build <b>APIs</b>
                                </li>
                                <li>Code CSS from designs</li>
                                <li>Write code for back end and front end</li>
                                <li>
                                    <b>Design sites</b> from scratch
                                </li>
                                <li>
                                    Consistently <b>expand skillset</b>
                                </li>
                                <li>
                                    Code <b>custom tooling</b>
                                </li>
                                <li>
                                    Write clean and <b>maintainable code</b>
                                </li>
                                <li>
                                    Work with <b>modern JS tooling</b>
                                </li>
                                <li>
                                    Use <b>git/Github</b> for version control
                                </li>
                                <li>Use best practices</li>
                            </ul>
                        ),
                    },
                    {
                        icon_url: './imgs/verified.svg',
                        title: 'What I know',
                        text: (
                            <>
                                <div>
                                    <b>Frontend:</b>
                                </div>
                                <ul className="skills-list">
                                    <li>JavaScript</li>
                                    <li>HTML</li>
                                    <li>Modern CSS</li>
                                    <li>React.js</li>
                                    <li>Sass</li>
                                    <li>JSS</li>
                                </ul>
                                <b>Backend:</b>
                                <ul className="skills-list">
                                    <li>Node.js</li>
                                    <li>Express.js</li>
                                </ul>
                                <b>Tooling:</b>
                                <ul className="skills-list">
                                    <li>Git/Github</li>
                                    <li>Figma Design and Prototyping</li>
                                    <li>Storybook</li>
                                    <li>Jest</li>
                                </ul>
                                <b>Programming Concepts:</b>
                                <ul className="skills-list">
                                    <li>Algorithms and Data Structures</li>
                                    <li>Testing</li>
                                    <li>Networks</li>
                                    <li>OOP</li>
                                    <li>Authetication</li>
                                </ul>
                                <b>Other Languages:</b>
                                <ul className="skills-list">
                                    <li>TypeScript</li>
                                    <li>Python</li>
                                </ul>
                            </>
                        ),
                    },
                ],
            },
            port: {
                port_title: 'Past Projects',
                projects: [
                    {
                        title: 'Hyporeal',
                        img: './imgs/mockup_yellow_cropped.jpg',
                        text: (
                            <>
                                <p>
                                    Hyporeal is a <b>Spotify visualizer</b>{' '}
                                    designed with the intention of improving on
                                    the existing Spotify visualizers I had seen
                                    by making a more dynamic, memorable and
                                    visually appealing experience done through
                                    the use of the Spotify <b>Web API</b> and{' '}
                                    <b>ThreeJS</b>.
                                </p>
                            </>
                        ),
                        side_class: 'port_item port_left',
                        accentColor: 'main',
                        links: [
                            {
                                text: 'Github',
                                url: 'https://www.github.com/alex-808/hyporeal-visualizer',
                            },
                            {
                                text: 'Full Write-up',
                                url: 'https://github.com/alex-808/write-ups/blob/master/Hyporeal.md',
                            },
                            {
                                text: 'Demo Video',
                                url: 'https://youtu.be/7cn17OJAH3Y',
                            },
                        ],
                    },
                    {
                        title: 'Ur.io',
                        img: './imgs/Game_Of_Ur_Blue.jpg',
                        text: (
                            <p>
                                Ur.io is{' '}
                                <b>a real-time online multiplayer board game</b>{' '}
                                written in <b>TypeScript</b> and based on a
                                similar game played in Mesopotamia over 4000
                                years ago. It uses <b>Socket.io</b>, a real-time
                                bi-directional communication library to share
                                and update game state between players and the
                                server running <b>Node.js.</b>
                            </p>
                        ),
                        side_class: 'port_item port_right',
                        accentColor: 'secondary',
                        links: [
                            {
                                text: 'Github',
                                url: 'https://www.github.com/alex-808/ur.io',
                            },
                            {
                                text: 'Full Write-up',
                                url: 'https://github.com/alex-808/write-ups/blob/master/Ur.io.md',
                            },
                            {
                                text: 'Demo Video',
                                url: 'https://youtu.be/_Krkc32Tp_M',
                            },
                        ],
                    },
                    {
                        title: 'Portfolio Website',
                        img: './imgs/Portfolio_Mockup_Blue.jpg',
                        text: (
                            <p>
                                This website was written using{' '}
                                <b>React and ThreeJS</b>. It was designed in{' '}
                                <b>Figma</b> and is deployed via Netlify. An
                                interesting feature of the site is that it
                                leverages <b>serverless functions</b> offered by
                                the Netlify platform to handle the sending of
                                emails to me via the contact form below.
                            </p>
                        ),
                        side_class: 'port_item port_left',
                        accentColor: 'secondary',
                        links: [
                            {
                                text: 'Github',
                                url: 'https://www.github.com/alex-808/portfolio',
                            },
                            {
                                text: 'Full Write-up',
                                url: 'https://github.com/alex-808/write-ups/blob/master/Portfolio-Site.md',
                            },
                        ],
                    },
                    {
                        title: 'Camera Obscura (In Progress)',
                        img: './imgs/Camera_Obscura_Mockup.jpg',
                        text: (
                            <p>
                                Camera Obscura is a <b>data visualization</b>{' '}
                                project written with <b>React </b> and{' '}
                                <b>Chart.js</b> designed to allow users to
                                analyze their musical lives via the Spotify Web
                                API. Users select playlists that they have added
                                music to and then can visually explore how their
                                taste and interests has changed over time.
                            </p>
                        ),
                        side_class: 'port_item port_right',
                        accentColor: 'main',
                        links: [
                            {
                                text: 'Github',
                                url: 'https://www.github.com/alex-808/camera-obscura',
                            },
                        ],
                    },
                ],
            },
            about_me: {
                title: 'Thanks for visiting!',
                text: (
                    <p>
                        If anything you have seen here interests you or you
                        would like to reach out, feel free to shoot me an email
                        at <b>alex@alexdavis.dev</b> or check out my other links
                        to see more info about me.
                    </p>
                ),
            },
            footer: {
                cta: '',
                social_icons: [
                    {
                        img: './imgs/GitHub-Mark-120px-plus.png',
                        link: 'https://github.com/alex-808',
                    },
                ],
            },
        };
    }
    render() {
        return (
            <div className="App">
                <main>
                    <canvas data-testid="canvas" id="main_canvas"></canvas>
                    <Hero hero={this.state.hero} test />
                    <Specializations items={this.state.spec.items} />
                    <Portfolio port={this.state.port} />
                    <AboutMe about_me={this.state.about_me} />
                    <Footer footer={this.state.footer} />
                    <Animation />
                </main>
            </div>
        );
    }
}

export default App;
