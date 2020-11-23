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
                spec_items: [
                    {
                        title: 'Who I am',
                        text:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh magna, condimentum non pulvinar nec, semper vel ipsum. Nulla facilisi. Suspendisse potent',
                    },
                    {
                        title: 'What I do',
                        text:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh magna, condimentum non pulvinar nec, semper vel ipsum. Nulla facilisi. Suspendisse potent',
                    },
                    {
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
                social_icons: [
                    {
                        social_icon: 'Url here',
                        social_icon: 'Url here',
                        social_icon: 'Url here',
                    },
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
                    <Specializations />
                    <Portfolio />
                    <AboutMe about_me={this.state.about_me} />
                    <Footer />
                    <Animation />
                </main>
            </div>
        );
    }
}

export default App;
