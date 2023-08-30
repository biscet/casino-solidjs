import { useUnit } from 'effector-solid';
import { Show, onCleanup, Index } from 'solid-js';
import { isEmpty } from 'src/lib/lodash';
import { A } from '@solidjs/router';
import {
  setDefaultMoneyFn,
  resetErrorForAddMoneyFn,
  $playerMoney,
  $errorForAddMoney,
} from 'src/models/Player/index';
import { games } from 'src/dict/config';

import 'src/styles/home.scss';

const Home = () => {
  const [playerMoney, errorForAddMoney] = useUnit([
    $playerMoney,
    $errorForAddMoney,
  ]);

  const showError = !isEmpty(errorForAddMoney);

  onCleanup(() => {
    resetErrorForAddMoneyFn();
  });

  return (
    <div class="home-wrapper">
      <div class="home-wrapper__balance-box">
        <p class="home-wrapper__balance">Your balance: {playerMoney()}$</p>
        <button
          class="home-wrapper__button"
          onClick={setDefaultMoneyFn}
          type="button"
        >
          Restore your balance
        </button>
      </div>

      <Show when={showError}>
        <div class="home-wrapper__error">{errorForAddMoney()}</div>
      </Show>

      <div class="home-wrapper__links">
        <Index each={games}>
          {(game) => {
            const { path, name } = game();
            return (
              <A href={path} class="home-wrapper__link">
                {name}
              </A>
            );
          }}
        </Index>
      </div>
    </div>
  );
};

export default Home;
