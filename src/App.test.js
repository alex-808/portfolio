import { render, screen } from '@testing-library/react';
import * as ReactDOM from 'react-dom';
import App from './App';

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('renders Hero component', async () => {
  render(<App />, container);
  screen.getByText('Hello,');
});

test('renders Specializations component', () => {
  render(<App />, container);
  screen.getByText('Who I am');
  screen.getByText('What I do');
  screen.getByText('What I know');
});
test('renders Portfolio component', () => {
  render(<App />, container);
  screen.getByText('Past Projects');
});
test('renders About Me component', () => {
  render(<App />, container);
  screen.getByText('Dev For Hire!');
});
test('renders ContactForm component', () => {
  render(<App />, container);
  screen.getByText('Contact Form');
});
test('renders Footer component', () => {
  render(<App />, container);
  screen.getByTestId('footer');
});
test('canvas element is rendered', () => {
  render(<App />, container);
  screen.getByTestId('canvas');
});
