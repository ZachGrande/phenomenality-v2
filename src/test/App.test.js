import { render, screen } from '@testing-library/react';
import App from '../components/App';
import {MemoryRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

test('renders landing page title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Landing page!/);
  expect(titleElement).toBeInTheDocument();
});

describe('navigation routing', () => {
  // test('bank page', async ()  => {
  //   render(<App />);
  //   const bankNavButton = screen.getByText('Your Bank')
  //   userEvent.click(bankNavButton)
  //   expect(screen.getByText(/Bank Page/)).toBeInTheDocument()
  // })

  test('Q&A page', async ()  => {
    render(<App />);
    const qaNavButton = screen.getByText('Q&A')
    userEvent.click(qaNavButton)
    expect(screen.getByText(/Questions/)).toBeInTheDocument()
  })

  test('sign in page', async ()  => {
    render(<App />);
    const signInNavButton = screen.getByText('Sign In')
    userEvent.click(signInNavButton)
    expect(screen.getByText(/Authentication Page/)).toBeInTheDocument()
  })
})
