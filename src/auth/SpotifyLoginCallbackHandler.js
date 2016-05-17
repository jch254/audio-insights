import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { loginSuccess } from './actions';

import FullscreenLoader from '../components/FullscreenLoader';

class SpotifyLoginCallbackHandler extends Component {
  componentWillMount() {
    const { router } = this.context;
    const { dispatch, location } = this.props;

    if (!location.hash) {
      router.push('/');
    } else {
      const hashParams = {};
      const hashArray = location.hash.substring(1).split('&');
      for (const i of hashArray) {
        const keyValPair = i.split('=');
        hashParams[keyValPair[0]] = keyValPair[1];
      }

      // TODO: Handle errors
      // expires_in is in seconds so convert to milliseconds to calculate token expiry
      const idTokenExpiryMilliseconds = Date.now() + (60 * 1000);

      dispatch(loginSuccess(hashParams.access_token, idTokenExpiryMilliseconds));
      router.push(hashParams.state);
    }
  }

  render() {
    return (
      <FullscreenLoader delay={0} />
    )
  }
}

SpotifyLoginCallbackHandler.propTypes = {
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

SpotifyLoginCallbackHandler.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(state => state)(SpotifyLoginCallbackHandler);
