import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Flex } from 'reflexbox';
import {
  Heading,
  Button,
} from 'rebass';

import FadeInTransition from './FadeInTransition';
import { actions as authActions, selectors as authSelectors } from '../auth';

const HomePage = ({ isLoggedIn, actions }) => (
  <FadeInTransition>
    <Flex key="home" flexColumn align="center" justify="center" style={{ flex: '1 0 auto' }} >
      <Heading mt={1} style={{ textAlign: 'center' }} level={1} big>
        Audio Insights
      </Heading>
      <Heading style={{ textAlign: 'center' }} level={2}>
        Derived from your Spotify library
      </Heading>
      {
        !isLoggedIn ?
          <Button my={3} big pill onClick={() => actions.loginRequest('mosaic')} backgroundColor="green">
            Login with Spotify
          </Button> :
          <Button my={3} big pill onClick={() => actions.logout()} backgroundColor="red">
            Logout
          </Button>
      }
    </Flex>
  </FadeInTransition>
);

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
};

HomePage.defaultProps = {
  isLoggedIn: false,
};

const mapStateToProps = state => (
  {
    isLoggedIn: authSelectors.getIsLoggedIn(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({ ...authActions }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
