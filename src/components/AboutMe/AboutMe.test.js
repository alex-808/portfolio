import { render } from '@testing-library/react';
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
  const { getByText } = render(
    <AboutMe about_me={{ title: 'Title' }} />,
    container
  );
  getByText('Title');
});

test('Text prop sets heading', () => {
  const { getByText } = render(
    <AboutMe about_me={{ text: 'text' }} />,
    container
  );
  getByText('text');
});
