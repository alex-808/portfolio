import './App.css';
import Hero from './components/Hero/Hero';
import Specializations from './components/Specializations/Specializations';

function App() {
    return (
        <div className="App">
            <main>
                <canvas id="main_canvas"></canvas>
                <Hero />
                <Specializations />
            </main>
        </div>
    );
}

export default App;
