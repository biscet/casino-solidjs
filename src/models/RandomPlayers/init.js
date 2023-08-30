import { randomNumber } from 'src/lib/random';
import { getUniqueOptions } from 'src/lib/lodash';
import {
  //Events
  spawnRandomPlayersFn,
  resetRandomPlayersFn,
  //Stores
  $randomPlayers,
} from './index';
import { users } from 'src/dict/users';

$randomPlayers.reset(resetRandomPlayersFn).on(spawnRandomPlayersFn, () => {
  const totalPlayersChar = randomNumber(40);
  const totalPlayers = [];

  for (let i = 0; i < totalPlayersChar; i++) {
    const user = users[randomNumber(200)];

    const nickname = user.username;
    const amount = Number(String(user.birthdate).slice(0, 4));

    totalPlayers.push({ nickname, amount });
  }

  return getUniqueOptions(totalPlayers).sort(
    (first, second) => second.amount - first.amount
  );
});
