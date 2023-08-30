import { onMount, onCleanup } from 'solid-js';
import {
  CrashGameContainer,
  CrashGameStats,
  CrashGameAmount,
} from 'src/components/index';
import {
  finishGameFn,
  startGameTimerFn,
  abortStartGameTimerFn,
  abortEndGameTimerFn,
  resetCurrentBetPointerFn,
} from '../models/Games/CrashGame/index';
import { TIMERS } from '../dict/config';
import { resetPlayerBetFn } from '../models/Player';

import 'src/styles/crash-game.scss';

const CrashGame = () => {
  onMount(() => {
    startGameTimerFn(TIMERS.START);
    resetCurrentBetPointerFn();
  });

  onCleanup(() => {
    finishGameFn();
    abortStartGameTimerFn();
    abortEndGameTimerFn();
    resetPlayerBetFn();
  });

  return (
    <div class="crash-game">
      <CrashGameStats />
      <CrashGameContainer />
      <CrashGameAmount />
    </div>
  );
};

export default CrashGame;
