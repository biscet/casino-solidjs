import {
  forward,
  guard,
  createEvent,
  createStore,
  createEffect,
} from 'effector';
import { isEmpty, wait } from './lodash';

export const changeStoreValue = (fn) => (e) => {
  fn(e.target.value);
};

// input type='button' отдается в e.target.value стрингу, разобраться
export const changeNumberStoreValue = (fn) => (e) => {
  const value = e.target.value
    .replace(/[^.\d]+/g, '')
    .replace(/^([^\.]*\.)|\./g, '$1');

  const splitNumber = value.split('.');

  if (!isEmpty(splitNumber[1]) && splitNumber[1].length > 2) {
    fn(`${splitNumber[0]}.${splitNumber[1].slice(0, 2)}`);
  } else {
    fn(value);
  }
};

export const createCountdown = (
  name,
  { start, abort = createEvent(`${name}Reset`), timeout = 1000 }
) => {
  const $working = createStore(true, { name: `${name}Working` });
  const tick = createEvent(`${name}Tick`);
  const timerFx = createEffect(`${name}Timer`).use(() => wait(timeout));

  $working.on(abort, () => false).on(start, () => true);

  guard({
    source: start,
    filter: timerFx.pending.map((is) => !is),
    target: tick,
  });

  forward({
    from: tick,
    to: timerFx,
  });

  const willTick = guard({
    source: timerFx.done.map(({ params }) => params - 1),
    filter: (seconds) => seconds >= 0,
  });

  guard({
    source: willTick,
    filter: $working,
    target: tick,
  });

  return { tick };
};

export const createCountup = (
  name,
  { start, abort = createEvent(`${name}Reset`), timeout = 1000 }
) => {
  const $working = createStore(true, { name: `${name}Working` });
  const tick = createEvent(`${name}Tick`);
  const timerFx = createEffect(`${name}Timer`).use(() => wait(timeout));

  $working.on(abort, () => false).on(start, () => true);

  guard({
    source: start,
    filter: timerFx.pending.map((is) => !is),
    target: tick,
  });

  forward({
    from: tick,
    to: timerFx,
  });

  const willTick = guard({
    source: timerFx.done.map(({ params }) => params + 1),
    filter: (seconds) => seconds >= 0,
  });

  guard({
    source: willTick,
    filter: $working,
    target: tick,
  });

  return { tick };
};
