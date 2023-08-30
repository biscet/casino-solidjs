import { sample, combine, split } from 'effector';
import { randomCrashPointer } from 'src/lib/random';
import {
  //Events
  setBetValueFn,
  setTakeBetValueFn,
  setLockValueFn,
  startBetFn,
  finishGameFn,
  startGameTimerFn,
  setLockAllValuesFn,
  setCrashPointFn,
  setErrorFromStartGameFn,
  resetErrorFromStartGameFn,
  setIsGameFn,
  abortEndGameTimerFn,
  abortStartGameTimerFn,
  resetCurrentBetPointerFn,
  setCurrentBetPointerFn,
  //Stores
  $betInputsData,
  $isGame,
  $crashGamePoint,
  $startGameTimer,
  $lockAllInputs,
  $errorForStartGame,
  $currentBetPointer,
  timerStartCountdown,
  timerEndCountup,
} from './index';
import { BET_INPUTS } from 'src/dict/fields';
import { TIMERS } from 'src/dict/config';
import {
  decMoneyFn,
  incBetsFn,
  $playerMoney,
  setPlayerBetFn,
} from 'src/models/Player/index';
import { spawnRandomPlayersFn } from 'src/models/RandomPlayers/index';
import { debounce } from 'patronum';
import {
  MIN_CRASH_GAME_BET,
  DEFAULT_DEBOUNCE_TIMER_VALUE,
} from 'src/dict/config';

const $startGameCombineData = combine(
  $betInputsData,
  $playerMoney,
  (betInputsData, playerMoney) => ({
    betInputsData,
    playerMoney,
  })
);

const { TAKE_BET, BET, MONEY } = BET_INPUTS;

$currentBetPointer
  .reset(resetCurrentBetPointerFn)
  .on(setCurrentBetPointerFn, (_, pointer) => pointer);

// Объект для изменения инпутов
$betInputsData
  .on(setBetValueFn, (data, newBetValue) => ({
    ...data,
    [BET]: newBetValue,
  }))
  .on(setTakeBetValueFn, (data, newTakeBetValue) => ({
    ...data,
    [TAKE_BET]: newTakeBetValue,
  }));

$lockAllInputs.on(setLockAllValuesFn, (_, state) => state);

$errorForStartGame
  .reset(resetErrorFromStartGameFn)
  .on(setErrorFromStartGameFn, (_, error) => error);

$crashGamePoint.reset(finishGameFn).on(setCrashPointFn, (_, point) => point);
$isGame.reset(finishGameFn).on(setIsGameFn, (_, state) => state);
$startGameTimer.reset(finishGameFn);

sample({
  clock: setLockValueFn,
  source: $betInputsData,
  fn: (data, state) => ({
    ...data,
    [state]: !data[state],
  }),
  target: $betInputsData,
});

split({
  clock: startBetFn,
  source: $startGameCombineData,
  match: {
    startGame: (data) =>
      Number(data.betInputsData[BET]) <= Number(data.playerMoney) &&
      Number(data.betInputsData[BET]) >= MIN_CRASH_GAME_BET,
    notMoney: (data) =>
      Number(data.betInputsData[BET]) > Number(data.playerMoney),
    minBet: (data) =>
      Number(data.betInputsData[BET]) <= Number(data.playerMoney) &&
      Number(data.betInputsData[BET]) < MIN_CRASH_GAME_BET,
  },
  cases: {
    startGame: [
      resetErrorFromStartGameFn,
      decMoneyFn.prepend((data) => data.betInputsData[BET]),
      incBetsFn,
      setPlayerBetFn.prepend((data) => ({
        [BET]: true,
        [MONEY]: data.betInputsData[BET],
      })),
    ],
    notMoney: setErrorFromStartGameFn.prepend(
      () => `You don't have enough money to bet`
    ),
    minBet: setErrorFromStartGameFn.prepend(
      () => `Minimum bet amount ${MIN_CRASH_GAME_BET}$`
    ),
  },
});

sample({
  clock: debounce({
    source: setErrorFromStartGameFn,
    timeout: DEFAULT_DEBOUNCE_TIMER_VALUE,
  }),
  target: resetErrorFromStartGameFn,
});

sample({
  clock: $isGame,
  filter: (_, isGame) => isGame === true,
  fn: () => {
    const point = randomCrashPointer(2);

    return {
      point: Number(point) < 1 ? '1.00' : point,
      lockAll: true,
    };
  },
  target: [
    setCrashPointFn.prepend((data) => data.point),
    setLockAllValuesFn.prepend((data) => data.lockAll),
  ],
});

sample({
  clock: timerStartCountdown.tick,
  fn: (tick) => tick,
  target: $startGameTimer,
});

sample({
  clock: timerStartCountdown.tick,
  filter: (tick) => tick < 1,
  target: [
    spawnRandomPlayersFn,
    setIsGameFn.prepend(() => true),
    abortStartGameTimerFn,
  ],
});

sample({
  clock: timerEndCountup.tick,
  filter: (tick) => tick > TIMERS.END - 1,
  target: [
    abortEndGameTimerFn,
    resetCurrentBetPointerFn,
    startGameTimerFn.prepend(() => TIMERS.START),
  ],
});
