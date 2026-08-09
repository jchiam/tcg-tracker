import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

export interface Game {
  /** Short game id used in tokens, CSS classes, and future table prefixes: 'ws', 'gd'. */
  id: string;
  name: string;
  /** Route path; each card navigates here. */
  path: string;
  publisher: string;
  description: string;
  /** Game accent colour (metadata for future switcher/badges). */
  accent: string;
  /** GameSwitcher trigger/dropdown icon, self-hosted under public/assets/icons/. */
  icon: string;
  /** SelectionPage card cover image, self-hosted under public/assets/. Null until art is sourced. */
  coverImage: string | null;
  /** SelectionPage card header background class from index.css (`bg-<id>-sel`). */
  bgClass: string;
  Page: LazyExoticComponent<ComponentType>;
}

/**
 * Single source of truth for the TCG roster. Adding a game here wires it into
 * the router and the SelectionPage grid at once; pair it with a `color.<id>`
 * token group and a `bg-<id>-sel` class in index.css.
 */
export const GAMES: Game[] = [
  {
    id: 'ws',
    name: 'Weiss Schwarz',
    path: '/weiss-schwarz',
    publisher: 'Bushiroad',
    description: 'Track your collection, trial decks, and 50-card builds across sets.',
    accent: '#c0c0cc',
    icon: '/assets/icons/ws-icon.webp',
    coverImage: '/assets/weiss-schwarz/cover.webp',
    bgClass: 'bg-ws-sel',
    Page: lazy(() => import('@/pages/weiss-schwarz/WsPage').then((m) => ({ default: m.WsPage }))),
  },
  {
    id: 'gd',
    name: 'Gundam Card Game',
    path: '/gundam',
    publisher: 'Bandai Namco',
    description: 'Track your collection, resource decks, and unit/pilot builds.',
    accent: '#4a9fd8',
    icon: '/assets/icons/gd-icon.webp',
    coverImage: '/assets/gundam/cover.webp',
    bgClass: 'bg-gd-sel',
    Page: lazy(() => import('@/pages/gundam/GdPage').then((m) => ({ default: m.GdPage }))),
  },
];
