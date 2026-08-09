import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { SelectionPage } from './SelectionPage';
import { GAMES } from '@/lib/games';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<SelectionPage />} />
        {GAMES.map((game) => (
          <Route key={game.id} path={game.path} element={<h1>{game.name} page</h1>} />
        ))}
      </Routes>
    </MemoryRouter>,
  );
}

afterEach(cleanup);

describe('SelectionPage', () => {
  it('renders hero and one card per registry entry', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'The JonZone Card Zone' })).toBeInTheDocument();
    for (const game of GAMES) {
      expect(screen.getByRole('heading', { name: game.name })).toBeInTheDocument();
      expect(screen.getByText(game.publisher)).toBeInTheDocument();
      expect(screen.getByText(game.description)).toBeInTheDocument();
    }
    expect(screen.getAllByRole('button')).toHaveLength(GAMES.length);
  });

  it('navigates to a game page when its card is clicked', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: new RegExp(GAMES[0].name) }));
    expect(screen.getByRole('heading', { name: `${GAMES[0].name} page` })).toBeInTheDocument();
  });

  it('cards are keyboard activatable', async () => {
    const user = userEvent.setup();
    renderPage();
    const card = screen.getByRole('button', { name: new RegExp(GAMES[1].name) });
    card.focus();
    expect(card).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('heading', { name: `${GAMES[1].name} page` })).toBeInTheDocument();
  });

  it('renders each cover image from the registry', () => {
    renderPage();
    const imgs = [...document.querySelectorAll('img.game-cover-image')];
    expect(imgs.map((img) => img.getAttribute('src'))).toEqual(GAMES.map((g) => g.coverImage));
  });

  it('shows the licensing attribution footer', () => {
    renderPage();
    expect(screen.getByText(/©Bushiroad/)).toBeInTheDocument();
    expect(screen.getByText(/©SOTSU・SUNRISE ©BANDAI/)).toBeInTheDocument();
  });
});
