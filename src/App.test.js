import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('home page has content', () => {
  render(<App />);
  const headerText = screen.getByText(/and save to reload./);
  expect(headerText).toBeInTheDocument();
});