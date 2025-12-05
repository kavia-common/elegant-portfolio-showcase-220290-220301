import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock API layer to avoid axios ESM import issues during tests
jest.mock('./services/api', () => ({
  getAbout: jest.fn(() => Promise.resolve({ name: 'Test', title: 'Engineer', bio: 'Bio', skills: [] })),
  getProjects: jest.fn(() => Promise.resolve([])),
  getExperience: jest.fn(() => Promise.resolve([])),
  postContact: jest.fn(() => Promise.resolve({ ok: true })),
}));

test('renders Navbar item Projects', async () => {
  render(<App />);
  // Navbar contains "Projects" link text
  const navItem = await screen.findAllByText(/Projects/i);
  expect(navItem[0]).toBeInTheDocument();
});

test('renders Featured Projects heading on home page', async () => {
  render(<App />);
  const heading = await screen.findByRole('heading', { name: /Featured Projects/i });
  expect(heading).toBeInTheDocument();
});
