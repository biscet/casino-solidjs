import { useUnit } from 'effector-solid';
import {
  $currentPlayerBet,
  incMoneyFn,
  resetPlayerBetFn,
} from 'src/models/Player';
import {
  setBetValueFn,
  setTakeBetValueFn,
  startBetFn,
  $isGame,
  $startGameTimer,
  $currentBetPointer,
} from 'src/models/Games/CrashGame/index';
import { BET_INPUTS, INPUT_NAMES } from 'src/dict/fields';
import { CrashGameInput, CrashGameStage } from './children/index';

const { LOCK_BET, LOCK_TAKE_BET, BET, TAKE_BET, MONEY } = BET_INPUTS;

const CrashGameContainer = () => {
  const [isGame, currentPlayerBet, timer, pointer] = useUnit([
    $isGame,
    $currentPlayerBet,
    $startGameTimer,
    $currentBetPointer,
  ]);

  return (
    <div class="container-wrapper">
      <div class="container-wrapper__stage">
        <CrashGameStage />
      </div>

      <div class="container-wrapper__bet-zone">
        <div class="container-wrapper__inputs-box">
          <CrashGameInput
            title={INPUT_NAMES.TAKE_BET}
            lockField={LOCK_TAKE_BET}
            changeField={TAKE_BET}
            inputOnChange={setTakeBetValueFn}
            type={INPUT_NAMES.TAKE_BET}
          />
          <CrashGameInput
            title={INPUT_NAMES.BET}
            lockField={LOCK_BET}
            changeField={BET}
            inputOnChange={setBetValueFn}
            type={INPUT_NAMES.BET}
          />
        </div>

        {isGame() && currentPlayerBet()[BET] ? (
          <button
            disabled={!currentPlayerBet()[BET]}
            class="container-wrapper__bet-button"
            type="button"
            onClick={() => {
              incMoneyFn(currentPlayerBet()[MONEY] * Number(pointer()));
              resetPlayerBetFn();
            }}
          >
            Take Bet
          </button>
        ) : (
          <button
            onClick={startBetFn}
            disabled={currentPlayerBet()[BET] || timer() === 0}
            class="container-wrapper__bet-button"
            type="button"
          >
            Bet
          </button>
        )}
      </div>
    </div>
  );
};

export default CrashGameContainer;
