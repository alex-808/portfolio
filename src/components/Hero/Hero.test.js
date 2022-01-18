import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Hero from './Hero';

test('hero.title prop sets Hero title', () => {
  const root = document.createElement('div');
  ReactDOM.render(<Hero hero={{ title: 'HeroTitle' }} />, root);

  expect(root.querySelector('h1').textContent).toBe('HeroTitle');
});
