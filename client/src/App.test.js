import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom' 

test('renders the landing page', () => {
  render(<App />);
  expect(screen.getByTestId("page-container")).toBeInTheDocument();
});
