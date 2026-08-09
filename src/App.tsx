import { Routes, Route } from 'react-router';
import './App.css';

function Home() {
  return (
    <main>
      <h1>TCG Tracker</h1>
      <p>Scaffold ready.</p>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
