require('cutestrap/dist/css/cutestrap.css');

import React from 'react';
import Relay from 'react-relay';
import { Button } from 'react-cutestrap';
import { render } from 'react-dom';

const FB_ACCESS_TOKEN = 'EAAExRkR7rEQBAMhoZA04PwShoAv2ORvfCH0sUL6UQ3DyuSe9u9Bu8aUZC0UEcXU5bZAr8tuamRM2VBNCRSbsch36JX6d2JxAbrcZB5UgFjEeJAmwHcJopfZAhBCfKjCMt0guI46OCO73IOrrCZCMQQbWfQgrL5EskmHo9PfaHWZCAZDZD';

class Welcome extends React.Component {
  render() {
    const { viewer: { name } } = this.props;
    return (
      <div>
        <h1>{`Hello ${name}`}</h1>

        <Button value='Click Me!' />
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
