import Relay from 'react-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import { match } from 'react-router';
import express from 'express';
import path from 'path';
import routes from './routes';
import { renderToString } from 'react-dom/server';
const app = express();
const REDIRECT_STATUS = 302;
const NOT_FOUND_STATUS = 404;
const APP_PORT = 8082;
const GRAPHQL_URL = 'http://localhost:8081/graphql';
const networkLayer = new Relay.DefaultNetworkLayer(GRAPHQL_URL, { headers: {
  'x-fb-token': 'EAAExRkR7rEQBAC2vBhqioZB5t8ZBb1mwq7c5rk3Op4BAOR0JtHxjz9Aix1DXMXtBCNh24BtYvqrLNwXXzkve6YPx5cPupp2UUiyoa9sZCuPzoYakTLjAHZAkLPBMPhE4JhiKclWfKBtNMjNzzPFbL9oFAj3SOWigqangi2UkswZDZD'
} });

app.set('view engine', 'ejs');

app.get('/*', (req, res, next) => {
  function render({ data, props }) {
    const reactOutput = renderToString(IsomorphicRouter.render(props));
    const preloadedData = JSON.stringify(data);
    const ejsPath = path.resolve(__dirname, 'views', 'index.ejs');

    res.render(ejsPath, { preloadedData, reactOutput, title: 'Isomorphic Relay Boilerplate' });
  }

  match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (error) {
      return next(error);
    } else if (redirectLocation) {
      return res.redirect(REDIRECT_STATUS, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      return IsomorphicRouter.prepareData(renderProps, networkLayer).then(render).catch(next);
    }

    return res.status(NOT_FOUND_STATUS).send('Not Found');
  });
});

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
