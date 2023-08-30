import { combine, createDomain } from 'effector';
import { pages, games } from 'src/dict/config';

const routesDomain = createDomain('routesDomain');

const $routes = routesDomain.createStore([...pages, ...games]);

export const $linksRoutes = combine($routes, (routes) => {
  return routes.map((route) => ({
    path: route.path,
    name: route.name,
  }));
});

export const $componentsRoutes = combine($routes, (routes) => {
  return routes.map((route) => ({
    path: route.path,
    component: route.component,
  }));
});
