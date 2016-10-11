import React from 'react';
import Relay from 'react-relay';
import { Grid, Button, Column, Text } from 'react-cutestrap';
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

export default Welcome;
