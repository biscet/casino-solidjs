import { split, sample } from 'effector';
import { debounce } from 'patronum';
import {
  //Events
  setDefaultMoneyFn,
  setErrorForAddMoneyFn,
  resetErrorForAddMoneyFn,
  decMoneyFn,
  incMoneyFn,
  resetBetsFn,
  incBetsFn,
  setPlayerBetFn,
  resetPlayerBetFn,
  //Stores
  $playerMoney,
  $playerBets,
  $errorForAddMoney,
  $currentPlayerBet,
} from './index';
import {
  DEFAULT_MONEY,
  MIN_CRASH_GAME_BET,
  DEFAULT_DEBOUNCE_TIMER_VALUE,
} from 'src/dict/config';

// Деньги игрока
$playerMoney
  .on(incMoneyFn, (currentMoney, addMoney) =>
    (Number(currentMoney) + Number(addMoney)).toFixed(2)
  )
  .on(decMoneyFn, (currentMoney, removeMoney) => {
    const finnalyMoney = currentMoney - removeMoney;
    return finnalyMoney < 0 ? 0 : finnalyMoney;
  });

$currentPlayerBet.reset(resetPlayerBetFn).on(setPlayerBetFn, (_, data) => data);

// Счетчик сколько игрок сделал ставок в игре
$playerBets.reset(resetBetsFn).on(incBetsFn, (bets) => bets + 1);

// Ошибка если игрок пытается вернуть себе 1000 денег когда его кошелек не пуст
$errorForAddMoney
  .reset(resetErrorForAddMoneyFn)
  .on(setErrorForAddMoneyFn, (_, error) => error);

split({
  clock: setDefaultMoneyFn,
  source: $playerMoney,
  match: {
    restore: (playerMoney) => playerMoney < MIN_CRASH_GAME_BET,
    error: (playerMoney) => playerMoney > MIN_CRASH_GAME_BET,
  },
  cases: {
    restore: incMoneyFn.prepend(
      (playerMoney) => playerMoney - playerMoney * 2 + DEFAULT_MONEY
    ),
    error: setErrorForAddMoneyFn.prepend(
      () =>
        `Your bank is greater than the minimum bet value. Minimum bet ${MIN_CRASH_GAME_BET}$`
    ),
  },
});

sample({
  clock: debounce({
    source: setErrorForAddMoneyFn,
    timeout: DEFAULT_DEBOUNCE_TIMER_VALUE,
  }),
  target: resetErrorForAddMoneyFn,
});
