import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginSuccess, loginFailure } from './actions';
import { exchangeCodeForToken } from '../spotifyApiService';
import { getStoredPkceVerifier, removeStoredPkceVerifier } from '../utils';
import FullscreenLoader from '../shared-components/FullscreenLoader';

class SpotifyLoginCallbackHandler extends Component {
  componentDidMount() {
    const { router } = this.context;
    const { dispatch, location } = this.props;

    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');
    const error = params.get('error');
    const verifier = getStoredPkceVerifier();

    if (error || !code || !verifier) {
      removeStoredPkceVerifier();
      if (error) {
        dispatch(loginFailure(error));
      }
      router.push('/');
      return;
    }

    exchangeCodeForToken(code, verifier)
      .then((tokenData) => {
        removeStoredPkceVerifier();
        const idTokenExpiryMilliseconds = Date.now() + (tokenData.expires_in * 1000);
        dispatch(loginSuccess(tokenData.access_token, idTokenExpiryMilliseconds));
        router.push(state || '/');
      })
      .catch((err) => {
        removeStoredPkceVerifier();
        dispatch(loginFailure(err.message));
        router.push('/');
      });
  }

  render() {
    return (
      <FullscreenLoader delay={0} />
    );
  }
}

SpotifyLoginCallbackHandler.propTypes = {
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

SpotifyLoginCallbackHandler.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect()(SpotifyLoginCallbackHandler);
