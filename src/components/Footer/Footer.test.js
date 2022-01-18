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

test('Footer accepts and renders social links', () => {
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

test('Footer accepts and renders social imgs', () => {
  const { getByRole } = render(
    <Footer
      footer={{
        cta: '',
        social_icons: [
          {
            img: './img.jpg',
            link: null,
          },
        ],
      }}
    />,
    container
  );
  expect(getByRole('img').getAttribute('src')).toBe('./img.jpg');
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

test('Footer can handle no cta or social icons', () => {
  render(<Footer />, container);
});
