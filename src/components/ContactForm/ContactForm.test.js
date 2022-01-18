import * as ReactDOM from 'react-dom';
import {
  screen,
  fireEvent,
  getByText,
  render,
  waitFor,
} from '@testing-library/react';
import { ContactForm } from './ContactForm';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.append(container);
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('Contact form has correct heading', () => {
  const { getByText } = render(<ContactForm />, container);
  getByText('Contact Form');
});
test('Contact form has 3 correct input fields', () => {
  const { getByLabelText } = render(<ContactForm />, container);
  getByLabelText('Name:');
  getByLabelText('Email:');
  getByLabelText('Message:');
});
test('Error message is show for blank email', async () => {
  const { getByRole } = render(<ContactForm />, container);
  const submitBtn = getByRole('button');

  fireEvent.click(submitBtn);
});
test('Error message is show for invalid email', async () => {
  const { getByLabelText, getByRole } = render(<ContactForm />, container);
  const emailInput = getByLabelText('Email:');
  const submitBtn = getByRole('button');

  fireEvent.click(submitBtn);
  fireEvent.input(emailInput, { value: 'test' });
  await waitFor(() => screen.getByText('Invalid Email'));
});

test('Success message is show for valid email', async () => {
  const { getByLabelText, getByRole } = render(<ContactForm />, container);
  const emailInput = getByLabelText('Email:');
  const submitBtn = getByRole('button');

  fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.click(submitBtn);
  await waitFor(() => {
    screen.getByText('Message sent!');
  });
});

test.todo('Form does not permit common XSS special characters');
test.todo('Thank you message renders when message sent');
