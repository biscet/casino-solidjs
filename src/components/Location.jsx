import { useLocation } from '@solidjs/router';
import { createEffect } from 'solid-js';
import { resetBetsFn } from 'src/models/Player/index';

const Location = () => {
  const location = useLocation();

  createEffect(() => {
    if (location.pathname) {
      resetBetsFn();
    }
  });

  return null;
};

export default Location;
