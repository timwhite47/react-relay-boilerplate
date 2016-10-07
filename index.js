import React from 'react';
import Relay from 'react-relay';
import { render } from 'react-dom';

const FB_ACCESS_TOKEN = 'CHANGE_ME';

class Welcome extends React.Component {
  render() {
    const { viewer: { name } } = this.props;
    return (
      <div>
        <h1>{`Hello ${name}`}</h1>
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