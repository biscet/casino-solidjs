import { useUnit } from 'effector-solid';
import { createEffect, Show } from 'solid-js';
import {
  $gameCombineData,
  $errorForStartGame,
  $crashGamePoint,
  $currentBetPointer,
  $betInputsData,
  setCurrentBetPointerFn,
  endGameTimerFn,
  setIsGameFn,
  setLockAllValuesFn,
} from 'src/models/Games/CrashGame/index';
import { CRASH_GAME_CONTENT, BET_INPUTS } from 'src/dict/fields';
import { isEmpty } from 'src/lib/lodash';
import { resetPlayerBetFn } from 'src/models/Player';
import { incMoneyFn, $currentPlayerBet } from 'src/models/Player';

const { GAME, TIMER_START, ERROR } = CRASH_GAME_CONTENT;

const CrashGameStage = () => {
  const [gameCombineData, errorForStartGame] = useUnit([
    $gameCombineData,
    $errorForStartGame,
  ]);

  const whenShow = (content) => {
    let show = false;

    switch (content) {
      case TIMER_START: {
        show =
          6 > gameCombineData().startTime && gameCombineData().startTime !== 0;
        break;
      }
      case GAME: {
        show = gameCombineData().startTime === 0;
        break;
      }
      case ERROR: {
        show = !isEmpty(errorForStartGame());
        break;
      }
      default: {
        break;
      }
    }

    return show;
  };

  return (
    <div class="stage">
      <Show when={whenShow(TIMER_START)}>
        <div class="stage__start-char">{gameCombineData().startTime}</div>
      </Show>

      <Show when={whenShow(GAME)}>
        <div>{gameCombineData().crashPoint}</div>
        <Counter />
      </Show>

      <Show when={whenShow(ERROR)}>
        <div class="stage__error">{errorForStartGame()}</div>
      </Show>
    </div>
  );
};

export const Counter = () => {
  const [crashGamePoint, point, betInputsData, currentPlayerBet] = useUnit([
    $crashGamePoint,
    $currentBetPointer,
    $betInputsData,
    $currentPlayerBet,
  ]);
  let timerSpeed = 200;

  createEffect(() => {
    if (point() < Number(crashGamePoint())) {
      setTimeout(() => {
        const newPoint = point() + 0.01;
        setCurrentBetPointerFn(Number(newPoint.toFixed(2)));
      }, timerSpeed);
    }

    if (
      betInputsData()[BET_INPUTS.LOCK_TAKE_BET] &&
      Number(betInputsData()[BET_INPUTS.TAKE_BET]) === point() &&
      currentPlayerBet()[BET_INPUTS.BET]
    ) {
      incMoneyFn(
        Number(betInputsData()[BET_INPUTS.TAKE_BET]) *
          currentPlayerBet()[BET_INPUTS.MONEY]
      );
      resetPlayerBetFn();
    }

    if (point() === crashGamePoint() || '1.00' === crashGamePoint()) {
      endGameTimerFn(0);
      setIsGameFn(false);
      setLockAllValuesFn(false);
      resetPlayerBetFn();
    }

    switch (point()) {
      case 1.15: {
        timerSpeed = 190;
        break;
      }
      case 1.25: {
        timerSpeed = 180;
        break;
      }
      case 1.45: {
        timerSpeed = 170;
        break;
      }
      case 1.75: {
        timerSpeed = 160;
        break;
      }
      case 2.1: {
        timerSpeed = 150;
        break;
      }
      case 2.3: {
        timerSpeed = 140;
        break;
      }
      case 3: {
        timerSpeed = 130;
        break;
      }
      case 3.5: {
        timerSpeed = 120;
        break;
      }
      case 4: {
        timerSpeed = 110;
        break;
      }
      case 5: {
        timerSpeed = 100;
        break;
      }
      case 10: {
        timerSpeed = 75;
        break;
      }
      case 20: {
        timerSpeed = 50;
        break;
      }
      default: {
        break;
      }
    }
  });

  return <div>{point().toFixed(2)}</div>;
};

export default CrashGameStage;
