import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Navbar } from './Navbar';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Navbar />
    </MemoryRouter>,
  );
}

afterEach(cleanup);

describe('Navbar', () => {
  it('renders the brand as a link home on the landing page', () => {
    renderAt('/');
    const brand = screen.getByRole('link', { name: /The JonZone Card Zone/ });
    expect(brand).toHaveAttribute('href', '/');
  });

  it('renders the brand on game routes', () => {
    renderAt('/weiss-schwarz');
    expect(screen.getByRole('link', { name: /The JonZone Card Zone/ })).toBeInTheDocument();
  });

  it('has no auth controls', () => {
    renderAt('/');
    expect(screen.queryByText(/Sign In/)).toBeNull();
    expect(screen.queryByText(/Sign Out/)).toBeNull();
  });
});
