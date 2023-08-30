import { Home, CrashGame } from 'src/pages/index';

export const pages = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

export const games = [
  {
    path: '/crash-game',
    name: 'Crash Game',
    component: CrashGame,
  },
];

export const DEFAULT_MONEY = 1000;

export const MIN_CRASH_GAME_BET = 20;

// MS
export const DEFAULT_DEBOUNCE_TIMER_VALUE = 2000;

export const TIMERS = {
  START: 10,
  END: 3,
};
