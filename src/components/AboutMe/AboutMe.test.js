import { render, screen } from '@testing-library/react';
import * as ReactDOM from 'react-dom';
import AboutMe from './AboutMe';

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

test('Title prop sets heading', () => {
  render(<AboutMe about_me={{ title: 'Title' }} />, container);
  screen.getByText('Title');
});

test('Text prop sets text', () => {
  const { getByText } = render(
    <AboutMe about_me={{ text: 'text' }} />,
    container
  );
  getByText('text');
});

test('Should render a ContactForm component', () => {
  const { getAllByRole } = render(
    <AboutMe about_me={{ text: 'text' }} />,
    container
  );
  const inputFields = getAllByRole('textbox');
  expect(inputFields.length).toBe(3);
});
