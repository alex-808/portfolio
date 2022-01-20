import { render } from '@testing-library/react';
import * as ReactDOM from 'react-dom';
import Specializations from './Specializations';

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

test('Array of specializations result in multiple headers and imgs', () => {
  const { getAllByRole } = render(
    <Specializations
      items={[
        { icon: null, title: '', text: '' },
        { icon: null, title: '', text: '' },
        { icon: null, title: '', text: '' },
      ]}
    />,
    container
  );
  expect(getAllByRole('heading').length).toBe(3);
  expect(getAllByRole('img').length).toBe(3);
});
