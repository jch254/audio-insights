import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Flex } from 'reflexbox';

import { termChange, toggleDropdown } from './actions';
import { getCurrentTerm, getDropdownOpen } from './selectors';

import AppFooter from '../shared-components/AppFooter';
import Navbar from '../shared-components/Navbar';
import TrackInfoModal from '../shared-components/TrackInfoModal';
import WindowDimensionsWrapper from '../shared-components/WindowDimensionsWrapper';
import { actions as artistsActions } from '../artists';
import { selectors as authSelectors } from '../auth';
import { actions as mosaicActions } from '../mosaic';
import { actions as recommendedActions } from '../recommended';

export default class App extends Component {
  toggleDropdown = () => {
    this.props.dispatch(toggleDropdown());
  }

  handleTermChange = (idToken, newTerm) => {
    const { location, dispatch, currentTerm } = this.props;

    if (newTerm !== currentTerm) {
      dispatch(termChange(newTerm));

      if (location.pathname.includes('mosaic')) {
        dispatch(mosaicActions.mosaicRequest(idToken));
      } else if (location.pathname.includes('artists')) {
        dispatch(artistsActions.artistsRequest(idToken));
      } else if (location.pathname.includes('recommended')) {
        dispatch(recommendedActions.recommendedTracksRequest(idToken));
      }
    }

    dispatch(toggleDropdown());
  }

  render() {
    const { children, idToken, dropdownOpen } = this.props;

    return (
      <Flex column style={{ height: '100%' }}>
        <Navbar
          dropdownOpen={dropdownOpen}
          idToken={idToken}
          toggleDropdown={ this.toggleDropdown }
          handleTermChange={ this.handleTermChange }
        />
        {children}
        <WindowDimensionsWrapper>
          <TrackInfoModal />
        </WindowDimensionsWrapper>
        <AppFooter />
      </Flex>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  currentTerm: PropTypes.string.isRequired,
  dropdownOpen: PropTypes.bool.isRequired,
  idToken: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    currentTerm: getCurrentTerm(state),
    dropdownOpen: getDropdownOpen(state),
    idToken: authSelectors.getIdToken(state),
  };
};

export default connect(mapStateToProps)(App);
