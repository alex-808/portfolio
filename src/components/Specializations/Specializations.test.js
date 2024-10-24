import { render, screen } from '@testing-library/react';
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
    render(
        <Specializations
            items={[
                { icon: null, title: '', text: '' },
                { icon: null, title: '', text: '' },
                { icon: null, title: '', text: '' },
            ]}
        />,
        container
    );
    expect(screen.getAllByRole('heading').length).toBe(3);
    expect(screen.getAllByRole('img').length).toBe(3);
});
