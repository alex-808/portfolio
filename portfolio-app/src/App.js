import './App.css';
import React, {Component} from 'react';
import LandingPage from './components/LandingPage';
import Specializations from './components/Specializations';


class App extends Component {
  state = {
    spec_txt: [
      {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet scelerisque nibh. Maecenas ligula eros, volutpat ut justo at, porttitor iaculis leo. Curabitur ut ipsum vel nunc pretium elementum vel a arcu.",
        title: "Who I Am?",
        img: "fingerprint.svg"
      },
      {
        id: 2,
        text: "Dolor sit amet, consectetur adipiscing elit. Ut sit amet scelerisque nibh. Maecenas ligula eros, volutpat ut justo at, porttitor iaculis leo. Curabitur ut ipsum vel nunc pretium elementum vel a arcu.",
        title: "What I Do?",
        img: "code.svg"
      },
      {
        id: 1,
        text: "Ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet scelerisque nibh. Maecenas ligula eros, volutpat ut justo at, porttitor iaculis leo. Curabitur ut ipsum vel nunc pretium elementum vel a arcu.",
        title: "What Do I Know?",
        img: "checkmark.svg"
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
