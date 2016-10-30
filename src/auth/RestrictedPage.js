import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import functional from 'react-functional';

import FullscreenLoader from '../shared-components/FullscreenLoader';
import { loginRequest } from './actions';
import { getIdToken } from './selectors';

const RestrictedPage = ({ children, idToken }) => (idToken ? children : <FullscreenLoader delay={0} />);

RestrictedPage.propTypes = {
  children: PropTypes.node.isRequired,
  idToken: PropTypes.string,
};

RestrictedPage.componentWillMount = ({ actions, idToken, location }) => {
  const path = location.pathname.substring(1);

  if (!idToken) {
    actions.loginRequest(path);
  }
};

const mapStateToProps = state => (
  {
    idToken: getIdToken(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({ loginRequest }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(functional(RestrictedPage));
