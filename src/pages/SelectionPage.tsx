import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GAMES } from '@/lib/games';
import type { Game } from '@/lib/games';
import './SelectionPage.css';

function GameCard({ game }: { game: Game }) {
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <button onClick={() => navigate(game.path)} className="selection-card">
      <div className={`selection-card-header ${game.bgClass}`}>
        {game.coverImage && !imageFailed && (
          <img
            src={game.coverImage}
            alt=""
            className="game-cover-image"
            onError={() => setImageFailed(true)}
          />
        )}
        <div className="selection-card-overlay"></div>
      </div>

      <div className="selection-card-body">
        <div className="game-title-row">
          <h2 className="game-name">{game.name}</h2>
          <span className="game-tag-badge">{game.publisher}</span>
        </div>
        <p className="game-description">{game.description}</p>
      </div>
    </button>
  );
}

export function SelectionPage() {
  return (
    <main className="main-content selection-content">
      <header className="selection-hero">
        <h1 className="selection-title">The JonZone Card Zone</h1>
        <p className="selection-subtitle">
          Choose a game to track your collection and deck builds.
        </p>
      </header>

      <section className="selection-grid">
        {GAMES.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </section>

      <footer className="selection-attribution">
        Card game imagery ©Bushiroad ©SOTSU・SUNRISE ©BANDAI. This is an unofficial fan project; all
        trademarks belong to their respective owners.
      </footer>
    </main>
  );
}
