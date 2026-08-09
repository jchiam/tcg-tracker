import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { SelectionPage } from './SelectionPage';

vi.mock('@/lib/games', () => ({
  GAMES: [
    {
      id: 'ws',
      name: 'Weiss Schwarz',
      path: '/weiss-schwarz',
      publisher: 'Bushiroad',
      description: 'Test description.',
      accent: '#c0c0cc',
      coverImage: '/assets/weiss-schwarz/missing-cover.webp',
      bgClass: 'bg-ws-sel',
      Page: () => null,
    },
  ],
}));

afterEach(cleanup);

describe('SelectionPage image fallback', () => {
  it('hides a failed cover image and keeps the card functional', () => {
    render(
      <MemoryRouter>
        <SelectionPage />
      </MemoryRouter>,
    );

    const img = document.querySelector('img.game-cover-image');
    expect(img).not.toBeNull();
    fireEvent.error(img!);

    expect(document.querySelector('img.game-cover-image')).toBeNull();
    const card = screen.getByRole('button', { name: /Weiss Schwarz/ });
    expect(card).toBeEnabled();
    expect(screen.getByText('Bushiroad')).toBeInTheDocument();
  });
});
