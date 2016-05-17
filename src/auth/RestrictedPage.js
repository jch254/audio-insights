import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FullscreenLoader from '../components/FullscreenLoader';
import { loginRequest } from './actions';
import { getIdToken } from './selectors';

class RestrictedPage extends Component {
  componentWillMount() {
    const { dispatch, idToken, location } = this.props;
    const path = location.pathname.substring(1);

    if (!idToken) {
      dispatch(loginRequest(path));
    }
  }

  render() {
    const { children, idToken } = this.props;

    if (idToken) {
      return children;
    }

    return <FullscreenLoader delay={0} />;
  }
}

RestrictedPage.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  idToken: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    idToken: getIdToken(state),
  };
}

export default connect(mapStateToProps)(RestrictedPage);
