import App from './components/app';
import Welcome from './components/welcome';
import ViewerQueries from './queries/viewer';

export default [
  {
    path: '/',
    component: App,
    queries: ViewerQueries,
    indexRoute: {
      component: Welcome,
      queries: ViewerQueries,
    },
    childRoutes: [
      {
        path: ':foo',
        component: Welcome,
        queries: ViewerQueries,
      },
    ],
  },
];
