import * as ReactDOM from 'react-dom';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import { ContactForm, sanitizeFormData, validateEmail } from './ContactForm';

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
test('Contact form has 3 correct input fields and button', () => {
  render(<ContactForm />, container);
  screen.getByLabelText('Name:');
  screen.getByLabelText('Email:');
  screen.getByLabelText('Message:');
  screen.getByRole('button');
});
test('Error message is shown for blank email', async () => {
  const { getByRole } = render(<ContactForm />, container);
  const submitBtn = getByRole('button');

  fireEvent.click(submitBtn);
});
test('Error message is shown for invalid email', async () => {
  const { getByLabelText, getByRole } = render(<ContactForm />, container);
  const emailInput = getByLabelText('Email:');
  const submitBtn = getByRole('button');

  fireEvent.click(submitBtn);
  fireEvent.input(emailInput, { value: 'test' });
  await waitFor(() => screen.getByText('Invalid Email'));
});

test('Success message is shown for valid email', async () => {
  const { getByLabelText, getByRole } = render(<ContactForm />, container);
  const emailInput = getByLabelText('Email:');
  const submitBtn = getByRole('button');

  fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.click(submitBtn);
  await waitFor(() => {
    screen.getByText('Message sent!');
  });
});

test('sanitizeFormData helper fn returns obj with only XSS chars stripped out', () => {
  const formData = {
    name: '<script>',
    email: 'test@test.com',
    message: 'alert()',
  };

  const sanitized = sanitizeFormData(formData);
  expect(Object.values(sanitized)).not.toContain('<script>');
  expect(Object.values(sanitized)).not.toContain('</script>');
  expect(Object.values(sanitized)).toContain('test@test.com');
});
test('validateEmail helper fn returns true for valid emails', () => {
  expect(validateEmail('test@test.com')).toBe(true);
  expect(validateEmail('a@b.c')).toBe(true);
});
test('validateEmail helper fn returns false for invalid emails', () => {
  expect(validateEmail('')).toBe(false);
  expect(validateEmail('test@test')).toBe(false);
  expect(validateEmail('test@test.')).toBe(false);
  expect(validateEmail('@test.com')).toBe(false);
});
