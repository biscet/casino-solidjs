import { Router, Route, Routes, A } from '@solidjs/router';
import { Index } from 'solid-js';
import { useUnit } from 'effector-solid';
import { $linksRoutes, $componentsRoutes } from './models/Routes/index';
import { Location } from './components/index';

import './styles/global.scss';
import './styles/images.scss';

const App = () => {
  const [linksRoutes, componentsRoutes] = useUnit([
    $linksRoutes,
    $componentsRoutes,
  ]);

  return (
    <Router>
      <Location />

      <header class="header">
        <Index each={linksRoutes()}>
          {(linkRoute) => {
            const { path, name } = linkRoute();
            return (
              <A
                href={path}
                class="header__link link"
                activeClass="link_active"
                end={true}
              >
                {name}
              </A>
            );
          }}
        </Index>
      </header>

      <Routes>
        <Index each={componentsRoutes()}>
          {(componentRoute) => {
            const { path, component } = componentRoute();
            return <Route path={path} component={component} />;
          }}
        </Index>
      </Routes>
    </Router>
  );
};

export default App;
