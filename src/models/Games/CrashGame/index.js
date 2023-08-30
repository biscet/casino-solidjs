import { createDomain, combine } from 'effector';
import { BET_INPUTS, CRASH_GAME_CONTENT } from 'src/dict/fields';
import { createCountdown, createCountup } from 'src/lib/effector-helper';

const { LOCK_BET, LOCK_TAKE_BET, BET, TAKE_BET } = BET_INPUTS;
const { TIMER_START, TIMER_END } = CRASH_GAME_CONTENT;

export const defaultBetInputs = {
  [LOCK_BET]: false,
  [LOCK_TAKE_BET]: false,
  [BET]: 100,
  [TAKE_BET]: 1.5,
};

const crashGameDomain = createDomain('crashGameDomain');

export const setBetValueFn = crashGameDomain.createEvent();
export const setTakeBetValueFn = crashGameDomain.createEvent();
export const setLockValueFn = crashGameDomain.createEvent();
export const setLockAllValuesFn = crashGameDomain.createEvent();

export const startBetFn = crashGameDomain.createEvent();
export const finishGameFn = crashGameDomain.createEvent();
export const startGameTimerFn = crashGameDomain.createEvent();
export const abortStartGameTimerFn = crashGameDomain.createEvent();
export const setCrashPointFn = crashGameDomain.createEvent();
export const setIsGameFn = crashGameDomain.createEvent();

export const endGameTimerFn = crashGameDomain.createEvent();
export const abortEndGameTimerFn = crashGameDomain.createEvent();

export const setErrorFromStartGameFn = crashGameDomain.createEvent();
export const resetErrorFromStartGameFn = crashGameDomain.createEvent();

export const setCurrentBetPointerFn = crashGameDomain.createEvent();
export const resetCurrentBetPointerFn = crashGameDomain.createEvent();

export const $betInputsData = crashGameDomain.createStore(defaultBetInputs);
export const $lockAllInputs = crashGameDomain.createStore(false);

export const $crashGamePoint = crashGameDomain.createStore(9999);
export const $isGame = crashGameDomain.createStore(false);
export const $startGameTimer = crashGameDomain.createStore(9999);
export const $currentBetPointer = crashGameDomain.createStore(1);

export const $errorForStartGame = crashGameDomain.createStore('');

// Таймер обратного отсчета перед игрой
export const timerStartCountdown = createCountdown(TIMER_START, {
  start: startGameTimerFn,
  abort: abortStartGameTimerFn,
});

// Таймер обратного отсчета после игры
export const timerEndCountup = createCountup(TIMER_END, {
  start: endGameTimerFn,
  abort: abortEndGameTimerFn,
});

export const $gameCombineData = combine(
  $startGameTimer,
  $crashGamePoint,
  $isGame,
  $betInputsData,
  (startGameTimer, crashGamePoint, isGame, betInputsData) => ({
    startTime: startGameTimer,
    crashPoint: crashGamePoint,
    isGame,
    playerBet: betInputsData[BET],
  })
);
