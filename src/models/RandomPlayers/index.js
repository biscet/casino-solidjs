import { createDomain } from 'effector';

const randomPlayersDomain = createDomain('randomPlayersDomain');

export const spawnRandomPlayersFn = randomPlayersDomain.createEvent();
export const resetRandomPlayersFn = randomPlayersDomain.createEvent();

export const $randomPlayers = randomPlayersDomain.createStore([]);
