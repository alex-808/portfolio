import './App.css';
import Hero from './components/Hero/Hero';
import Specializations from './components/Specializations/Specializations';
import Portfolio from './components/Portfolio/Portfolio';
import AboutMe from './components/AboutMe/AboutMe';
import Footer from './components/Footer/Footer';
import Animation from './components/Animation/Animation';

function App() {
    return (
        <div className="App">
            <main>
                <canvas id="main_canvas"></canvas>
                <Hero />
                <Specializations />
                <Portfolio />
                <AboutMe />
                <Footer />
                <Animation />
            </main>
        </div>
    );
}

export default App;
