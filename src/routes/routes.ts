import Router from '~/constants/router';
import Content from '~/pages/Content';
import Home from '~/pages/Home';

import { RouteConfig } from './types';

export const privateRoutes: RouteConfig[] = [
  {
    path: Router.HOME,
    component: Home,
  },
  {
    path: Router.CONTENT,
    component: Content,
  },
];
