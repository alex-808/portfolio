import './App.css';
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
        this.state = {
            hero: {
                title: 'Hello,',
                text:
                    'My name is Alex and this is my website. I am a self-taught developer excited by the problems and opportunities of the modern web. Take a look around. Let me know if you see anything you like. Careful of the cubes.',
            },
            spec: {
                items: [
                    {
                        icon_url: './imgs/fingerprint.svg',
                        title: 'Who I am',
                        text:
                            'I am a self-taught developer born and raised in the sprawling cheese country (Wisconsin). I lived in Massachusetts for several years where I attended Clark University majoring in Communcations before finally landing in San Diego. Along the way I realized the conventional path was not for me and decided to find my own way. My passions aside from my burning love of programming are finding and making weird music, reading very dry books, trying to get outside once in a while and talking to people who are much smarter than me.',
                    },
                    {
                        icon_url: './imgs/code.svg',
                        title: 'What I do',
                        text:
                            'I solve problems through simple, elegant and scalable solutions, learn like crazy, rinse and repeat. Moreover, I plan, design and code full-stack web applications such as the one on your screen now.',
                    },
                    {
                        icon_url: './imgs/checkmark.svg',
                        title: 'What I know',
                        text:
                            'JavaScript, HTML, CSS, REST, SQL, Git/Github, Web Design and Prototyping, Python, Networking, Object Oriented Programming, React.js, Node.js, Express.js, Three.js, Authetication, Algorithms and Data Structures, TypeScript, Testing, Agile Development',
                    },
                ],
            },
            port: {
                port_title: 'Past Projects',
                projects: [
                    {
                        title: 'Hyporeal',
                        img: './imgs/mockup_yellow_cropped.png',
                        text:
                            'Hyporeal is a Spotify visualizer designed with the intention of improving on the existing Spotify visualizers I had seen by making a more dynamic, memorable and visually appealing experience done through the use of the Spotify Web API and ThreeJS. ',
                        side_class: 'port_item port_left',
                    },
                    {
                        title: 'Project Title',
                        img: './imgs/mockup_yellow_cropped.png',
                        text:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh magna, condimentum non pulvinar nec, semper vel ipsum. Nulla facilisi. Suspendisse potent',
                        side_class: 'port_item port_right',
                    },
                ],
            },
            about_me: {
                title: 'My_Story: From for-loop to full-stack() {',
                text:
                    'Several months ago I found myself with some extra time on my hands and decided to do something with it. In the process I discovered that I have a true passion for code in all its forms. In a span of months I went from writing my first for-loop to planning, designing and executing full-stack applications. Today I am looking for more opportunities to show my skills, create value with them and continue to grow by learning with the best. Although there is much that I still want to learn, my ambition is to create things that will change peoples lives.',
            },
            footer: {
                cta: 'Get in touch',
                social_icons: [
                    './imgs/checkmark.svg',
                    './imgs/checkmark.svg',
                    './imgs/checkmark.svg',
                ],
            },
        };
    }
    render() {
        return (
            <div className="App">
                <main>
                    <canvas id="main_canvas"></canvas>
                    <Hero hero={this.state.hero} />
                    <Specializations spec={this.state.spec} />
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
