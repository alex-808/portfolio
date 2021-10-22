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
        text: (
          <p>
            My name is Alex and this is my website. I am a{' '}
            <b>self-taught developer</b> excited by the problems and
            opportunities of the <b>modern web</b>. Take a look around. Let me
            know if you see anything you like. <b>Careful of the cubes.</b>
          </p>
        ),
      },
      spec: {
        items: [
          {
            icon_url: './imgs/fingerprint.svg',
            title: 'Who I am',
            text: (
              <div>
                <p>
                  I am a <b>self-taught developer</b> originally from Wisconsin
                  but living in San Diego since 2019. Before that I lived in
                  Massachusetts where I recieved a <b>B.A. in Communications</b>{' '}
                  from <b>Clark University</b>. Grateful to be somewhere warm
                  now.
                </p>
                <p>
                  My interests aside from my <b>love of programming</b> are
                  finding and making <b>weird music</b>, reading very{' '}
                  <b>dry books</b>, trying to get outside once in a while and{' '}
                  <b>talking to people</b> who are <b>much smarter</b> than me.
                </p>
              </div>
            ),
          },
          {
            icon_url: './imgs/code.svg',
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
                  Constantly <b>expand skillset</b>
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
            icon_url: './imgs/checkmark.svg',
            title: 'What I know',
            text: (
              <ul>
                <b>Core Web Technologies:</b>
                <li>JavaScript</li>
                <li>HTML</li>
                <li>CSS</li>
                <b>Frontend Framework:</b>
                <li>React.js</li>
                <b>Backend Technologies:</b>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>SQL</li>
                <b>Tooling:</b>
                <li>Git/Github</li>
                <li>Figma Design and Prototyping</li>
                <b>Libraries/Frameworks:</b>
                <li>Three.js</li>
                <li>OAuth</li>
                <li>Sass</li>
                <b>Programming Concepts:</b>
                <li>Algorithms and Data Structures</li>
                <li>Testing</li>
                <li>Agile Development</li>
                <li>Networks</li>
                <li>Object Oriented Programming</li>
                <li>Authetication</li>
                <b>Other Languages:</b>
                <li>TypeScript</li>
                <li>Python</li>
              </ul>
            ),
          },
        ],
      },
      port: {
        port_title: 'Past Projects',
        projects: [
          {
            title: 'Hyporeal',
            img: './imgs/mockup_yellow_cropped.png',
            text: (
              <p>
                Hyporeal is a <b>Spotify visualizer</b> designed with the
                intention of improving on the existing Spotify visualizers I had
                seen by making a more dynamic, memorable and visually appealing
                experience done through the use of the Spotify <b>Web API</b>{' '}
                and <b>ThreeJS</b>.
              </p>
            ),
            side_class: 'port_item port_left',
          },
          {
            title: 'Game of Ur (with friends)',
            img: './imgs/mockup_yellow_cropped.png',
            text: (
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                nibh magna, condimentum non pulvinar nec, semper vel ipsum.
                Nulla facilisi. Suspendisse potent
              </p>
            ),
            side_class: 'port_item port_right',
          },
          {
            title: 'Camera Obscura',
            img: './imgs/mockup_yellow_cropped.png',
            text: (
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                nibh magna, condimentum non pulvinar nec, semper vel ipsum.
                Nulla facilisi. Suspendisse potent
              </p>
            ),
            side_class: 'port_item port_left',
          },
          {
            title: 'Project Title',
            img: './imgs/mockup_yellow_cropped.png',
            text: (
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                nibh magna, condimentum non pulvinar nec, semper vel ipsum.
                Nulla facilisi. Suspendisse potent
              </p>
            ),
            side_class: 'port_item port_right',
          },
        ],
      },
      about_me: {
        title: 'My_Story: From for-loop to full-stack() {',
        text: (
          <p>
            Several months ago I found myself with some extra time on my hands
            and decided to do something with it. In the process I discovered
            that I have a true passion for code in all its forms. In a span of
            months I went from writing my first for-loop to planning, designing
            and executing full-stack applications. Today I am looking for more
            opportunities to show my skills, create value with them and continue
            to grow by learning with the best. Although there is much that I
            still want to learn, my ambition is to create things that will
            change peoples lives.
          </p>
        ),
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
