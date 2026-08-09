import { describe, it, expect } from 'vitest';
import { GAMES } from '@/lib/games';

describe('GAMES registry', () => {
  it('contains the two tracked TCGs', () => {
    expect(GAMES.map((g) => g.id)).toEqual(['ws', 'gd']);
  });

  it('exposes expected routes', () => {
    expect(GAMES.find((g) => g.id === 'ws')?.path).toBe('/weiss-schwarz');
    expect(GAMES.find((g) => g.id === 'gd')?.path).toBe('/gundam');
  });

  it('provides required display fields on every entry', () => {
    for (const game of GAMES) {
      expect(game.name).toBeTruthy();
      expect(game.publisher).toBeTruthy();
      expect(game.description).toBeTruthy();
      expect(game.bgClass).toBe(`bg-${game.id}-sel`);
      expect(game.accent).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});
