import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hero component', () => {
  render(<App />);
  const heroComponent = screen.getByText(/hello/i);
  expect(heroComponent).toBeInTheDocument();
});
