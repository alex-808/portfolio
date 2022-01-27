import { render, screen } from '@testing-library/react';
import * as ReactDOM from 'react-dom';
import Portfolio from './Portfolio';

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
test('Renders without error', () => {
  render(<Portfolio />, container);
});

test('port_title prop sets title', () => {
  render(
    <Portfolio
      port={{
        port_title: 'Title',
      }}
    />,
    container
  );
  screen.getByText('Title');
});

test('projects array prop should result in multiple PortfolioItem components', () => {
  render(
    <Portfolio
      port={{
        projects: [{ title: 'title1' }, { title: 'title2' }],
      }}
    />,
    container
  );
  screen.getByText('title1');
  screen.getByText('title2');
});

test('projects array prop with 3 images should result in 3 images on screen', () => {
  render(
    <Portfolio
      port={{
        projects: [
          { img: './image.jpg' },
          { img: './image.jpg' },
          { img: './image.jpg' },
        ],
      }}
    />,
    container
  );
  expect(screen.getAllByRole('img').length).toBe(3);
});
