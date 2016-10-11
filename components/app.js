import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {

  render() {
    // FIXME: Wrapper should be in react-cutestrap;

    const { children } = this.props;
    return (
      <div className='wrapper'>{children}</div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.any,
};

App = Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
  },
});

export default App;
