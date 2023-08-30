import { useUnit } from 'effector-solid';
import { For } from 'solid-js';
import { $randomPlayers } from 'src/models/RandomPlayers/index';

const NoAmountPlayersFallback = () => {
  return (
    <div class="players-wrapper__no-amount">
      <h1>Wait for the start</h1>
    </div>
  );
};

const CrashGameAmount = () => {
  const [randomPlayers] = useUnit([$randomPlayers]);

  return (
    <div class="players-wrapper">
      <div class="players-wrapper__title">Amount Players</div>

      <For each={randomPlayers()} fallback={NoAmountPlayersFallback}>
        {(player) => {
          const { nickname, amount } = player;

          return (
            <div class="players-wrapper__player">
              <div class="nickname">{nickname}</div>
              <div class="amount">{amount}$</div>
            </div>
          );
        }}
      </For>
    </div>
  );
};

export default CrashGameAmount;
