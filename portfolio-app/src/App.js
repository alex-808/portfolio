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
                    'My name is Alex and this is my website etc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh magna, condimentum non pulvinar nec, semper vel ipsum.',
            },
            spec: {
                items: [
                    {
                        icon_url: './imgs/fingerprint.svg',
                        title: 'Who I am',
                        text:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh magna, condimentum non pulvinar nec, semper vel ipsum. Nulla facilisi. Suspendisse potent',
                    },
                    {
                        icon_url: './imgs/code.svg',
                        title: 'What I do',
                        text:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh magna, condimentum non pulvinar nec, semper vel ipsum. Nulla facilisi. Suspendisse potent',
                    },
                    {
                        icon_url: './imgs/checkmark.svg',
                        title: 'What I know',
                        text:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh magna, condimentum non pulvinar nec, semper vel ipsum. Nulla facilisi. Suspendisse potent',
                    },
                ],
            },
            port: {
                port_title: 'Past Projects',
                project_items: [
                    {
                        title: 'Project Title',
                        img: 'Url here',
                        text:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh magna, condimentum non pulvinar nec, semper vel ipsum. Nulla facilisi. Suspendisse potent',
                    },
                    {
                        title: 'Project Title',
                        img: 'Url here',
                        text:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh magna, condimentum non pulvinar nec, semper vel ipsum. Nulla facilisi. Suspendisse potent',
                    },
                ],
            },
            about_me: {
                title: 'About me',
                text:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh magna, condimentum non pulvinar nec, semper vel ipsum. Nulla facilisi. Suspendisse potent Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh magna, condimentum non pulvinar nec, semper vel ipsum. Nulla facilisi. Suspendisse potent Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh magna, condimentum non pulvinar nec, semper vel ipsum. Nulla facilisi. Suspendisse potent',
            },
            footer: {
                footer_cta: 'Call to action',
                social_icons: ['Url here', 'Url here', 'Url here'],
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
