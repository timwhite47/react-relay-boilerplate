require('cutestrap/dist/css/cutestrap.css');

import React from 'react';
import Relay from 'react-relay';
import { Button, Grid, Column, Text } from 'react-cutestrap';
import { render } from 'react-dom';

const FB_ACCESS_TOKEN = 'CHANGE_ME';

class Welcome extends React.Component {
  render() {
    const { viewer: { name } } = this.props;
    return (
      <div>
        <Grid>
          <div>
          <h1>{`Hello ${name}`}</h1>

          <Button value='Click Me!' />
          </div>

          <Column>
            <Text align='center'>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</Text>
          </Column>
        </Grid>
      </div>
    );
  }
}

Welcome.propTypes = {
  viewer: React.PropTypes.object,
};

Welcome = Relay.createContainer(Welcome, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        name,
        id,
      }
    `,
  },
});

class WelcomeRoute extends Relay.Route {
  static routeName = 'WelcomeRoute';
  static queries = {
    viewer: ((Component) => Relay.QL`
      query {
      	viewer {
          ${Component.getFragment('viewer')}
        }
      }
  `),
  };
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:8081/graphql', {
    headers: {
      'x-fb-token': FB_ACCESS_TOKEN,
    },
  })
);

const mountNode = document.getElementById('container');
const rootComponent = <Relay.RootContainer
  Component={Welcome}
  route={new WelcomeRoute()} />;
render(rootComponent, mountNode);
