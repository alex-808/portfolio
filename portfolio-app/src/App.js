import './App.css';
import React, {Component} from 'react';
import LandingPage from './components/LandingPage';
import Specializations from './components/Specializations';


class App extends Component {
  state = {
    spec_txt: [
      {
        id: 1,
        text: "Lorem ip ship",
        title: "Whoo"
      },
      {
        id: 2,
        text: "Bom is ship",
        title: "Yeahah"
      },
      {
        id: 1,
        text: "Rem ship",
        title: "Yahow"
      }
    ]
  }
  render() {
    return (
      <div className="App">
        <LandingPage />
        <Specializations texts={this.state.spec_txt} />
      </div>
    );
  }
  
  }

export default App;
