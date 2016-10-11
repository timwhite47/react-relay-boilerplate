require('cutestrap/dist/css/cutestrap.css');
import React from 'react';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import ReactDOM from 'react-dom';
import { browserHistory, match, Router } from 'react-router';
import Relay from 'react-relay';
import routes from './routes';

const environment = new Relay.Environment();

environment.injectNetworkLayer(new Relay.DefaultNetworkLayer('http://localhost:8081/graphql', {
  'x-fb-token': 'EAAExRkR7rEQBAC2vBhqioZB5t8ZBb1mwq7c5rk3Op4BAOR0JtHxjz9Aix1DXMXtBCNh24BtYvqrLNwXXzkve6YPx5cPupp2UUiyoa9sZCuPzoYakTLjAHZAkLPBMPhE4JhiKclWfKBtNMjNzzPFbL9oFAj3SOWigqangi2UkswZDZD',
}));
const dataTag = document.getElementById('preloadedData');
const data = JSON.parse(dataTag.textContent);
IsomorphicRelay.injectPreparedData(environment, JSON.parse(data));
const rootElement = document.getElementById('root');
match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
  IsomorphicRouter.prepareInitialRender(environment, renderProps).then((props) => {
    ReactDOM.render(<Router {...props} />, rootElement);
  });
});
