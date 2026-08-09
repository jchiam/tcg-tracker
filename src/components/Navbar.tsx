import { Link } from 'react-router';
import { GameSwitcher } from './GameSwitcher';
import './Navbar.css';

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <GameSwitcher />
        <Link to="/" className="nav-brand">
          <img src="/brand-logo.webp" alt="JC" className="brand-logo" />
          The JonZone Card Zone
        </Link>
      </div>
    </nav>
  );
}
