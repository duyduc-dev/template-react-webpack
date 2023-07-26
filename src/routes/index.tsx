import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import EmptyLayout from '@/layouts/EmptyLayout';
import NotFoundPage from '@/pages/NotFound';

import { privateRoutes } from './routes';
import { RouteConfig } from './types';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {renderRoutes(privateRoutes)}
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </>
  )
);

function renderRoutes(routes: RouteConfig[]) {
  return routes.map((route) => {
    const { component: Page, layout: Layout = EmptyLayout, path, children } = route;
    return (
      <Route
        key={path}
        path={path}
        element={
          children?.length ? null : (
            <Layout>
              <Page />
            </Layout>
          )
        }
      >
        {children?.length &&
          renderRoutes([
            {
              component: Page,
              layout: Layout,
              path: '',
            },
            ...children,
          ])}
      </Route>
    );
  });
}

export { default as AppRoutes } from './AppRoutes';
