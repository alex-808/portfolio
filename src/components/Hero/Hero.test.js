import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getQueriesForElement } from '@testing-library/react';

import Hero from './Hero';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
});

// Testing component from user perspective
test('Title prop text is present in Hero component', () => {
    ReactDOM.render(<Hero hero={{ title: 'Hello' }} />, container);

    const { getByText } = getQueriesForElement(container);
    getByText('Hello');
});

test('Text prop text is present in Hero component', () => {
    ReactDOM.render(<Hero hero={{ text: 'This is test text' }} />, container);

    const { getByText } = getQueriesForElement(container);
    getByText('This is test text');
});
