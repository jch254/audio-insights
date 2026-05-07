import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FullscreenLoader from '../shared-components/FullscreenLoader';
import { loginRequest } from './actions';
import { getIdToken } from './selectors';

class RestrictedPage extends React.Component {
  componentDidMount() {
    const { actions, idToken, location } = this.props;
    const path = location.pathname.substring(1);

    if (!idToken) {
      actions.loginRequest(path);
    }
  }

  render() {
    const { children, idToken } = this.props;

    return idToken ? children : <FullscreenLoader delay={0} />;
  }
}

RestrictedPage.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  idToken: PropTypes.string,
  location: PropTypes.object.isRequired,
};

RestrictedPage.defaultProps = {
  idToken: null,
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

export default connect(mapStateToProps, mapDispatchToProps)(RestrictedPage);
