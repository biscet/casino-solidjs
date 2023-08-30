import { createDomain, combine } from 'effector';
import { persist } from 'effector-storage/local';
import { DEFAULT_MONEY } from 'src/dict/config';
import { BET_INPUTS } from '../../dict/fields';

const playersDomain = createDomain('playersDomain');

export const setDefaultMoneyFn = playersDomain.createEvent();
export const decMoneyFn = playersDomain.createEvent();
export const incMoneyFn = playersDomain.createEvent();

export const setErrorForAddMoneyFn = playersDomain.createEvent();
export const resetErrorForAddMoneyFn = playersDomain.createEvent();

export const incBetsFn = playersDomain.createEvent();
export const resetBetsFn = playersDomain.createEvent();

export const setPlayerBetFn = playersDomain.createEvent();
export const resetPlayerBetFn = playersDomain.createEvent();

export const $playerMoney = playersDomain.createStore(DEFAULT_MONEY, {
  name: 'playerMoney',
});

export const $playerBets = playersDomain.createStore(0);

export const $currentPlayerBet = playersDomain.createStore({
  [BET_INPUTS.BET]: false,
  [BET_INPUTS.MONEY]: 0,
});

export const $errorForAddMoney = playersDomain.createStore('');

export const $playerCombineData = combine(
  $playerMoney,
  $playerBets,
  (playerMoney, playerBets) => ({
    money: playerMoney,
    bets: playerBets,
  })
);

persist({ store: $playerMoney });
