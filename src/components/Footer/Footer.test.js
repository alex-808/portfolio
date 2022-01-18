import * as ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import Footer from './Footer';

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

test('Footer links to Github', () => {
  const { getByRole } = render(
    <Footer
      footer={{
        cta: '',
        social_icons: [
          {
            img: null,
            link: 'www.github.com',
          },
        ],
      }}
    />,
    container
  );
  expect(getByRole('link').getAttribute('href')).toBe('www.github.com');
});
test('cta prop sets cta text', () => {
  const { getByText } = render(
    <Footer
      footer={{
        cta: 'Call to Action',
        social_icons: [],
      }}
    />,
    container
  );

  getByText('Call to Action');
});
