import { Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { GAMES } from '@/lib/games';
import { Navbar } from '@/components/Navbar';
import { SelectionPage } from '@/pages/SelectionPage';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="main-content">Loading...</div>}>
        <Routes>
          <Route path="/" element={<SelectionPage />} />
          {GAMES.map((game) => (
            <Route key={game.id} path={game.path} element={<game.Page />} />
          ))}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
