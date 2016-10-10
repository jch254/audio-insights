import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Flex } from 'reflexbox';
import {
  Heading,
  Button,
} from 'rebass'

import FadeInTransition from './FadeInTransition';

import { actions as authActions, selectors as authSelectors } from '../auth';

class HomePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    idToken: PropTypes.string,
  };

  handleLogin = () => {
    this.props.dispatch(authActions.loginRequest('mosaic'));
  }

  handleLogout = () => {
    this.props.dispatch(authActions.logout());
  }

  render() {
    return (
      <FadeInTransition>
        <Flex key="home" column align="center" justify="center" style={{ flex: '1 0 auto' }} >
          <Heading mt={1} style={{ textAlign: 'center' }} level={1} big>
            Audio Insights
          </Heading>
          <Heading style={{ textAlign: 'center' }} level={2}>
            Derived from your Spotify library
          </Heading>
            {
              !this.props.idToken ?
                <Button my={3} big pill onClick={ this.handleLogin } backgroundColor="green">
                  Login with Spotify
                </Button> :
                <Button my={3} big pill onClick={ this.handleLogout } backgroundColor="red">
                  Logout
                </Button>
            }
        </Flex>
      </FadeInTransition>
    );
  }
}

function mapStateToProps(state) {
  return {
    idToken: authSelectors.getIdToken(state),
  };
}

export default connect(mapStateToProps)(HomePage);
