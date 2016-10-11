import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Flex } from 'reflexbox';

import { termChange, toggleDropdown } from './actions';
import { getCurrentTerm, getIsDropdownOpen } from './selectors';

import AppFooter from '../shared-components/AppFooter';
import Navbar from '../shared-components/Navbar';
import TrackInfoModal from '../shared-components/TrackInfoModal';
import WindowDimensionsWrapper from '../shared-components/WindowDimensionsWrapper';
import { actions as artistsActions } from '../artists';
import { selectors as authSelectors } from '../auth';
import { actions as mosaicActions } from '../mosaic';
import { actions as recommendedActions } from '../recommended';

const App = ({ children, location, currentTerm, isDropdownOpen, idToken, actions }) => {
  const handleTermChange = (newTerm) => {
    if (newTerm !== currentTerm) {
      actions.termChange(newTerm);

      if (location.pathname.includes('mosaic')) {
        actions.mosaicRequest(idToken);
      } else if (location.pathname.includes('artists')) {
        actions.artistsRequest(idToken);
      } else if (location.pathname.includes('recommended')) {
        actions.recommendedTracksRequest(idToken);
      }
    }

    actions.toggleDropdown();
  };

  return (
    <Flex column style={{ height: '100%' }}>
      <Navbar
        isDropdownOpen={isDropdownOpen}
        isLoggedIn={idToken != null}
        onToggleDropdown={() => actions.toggleDropdown()}
        onTermChange={handleTermChange}
      />
      {children}
      <WindowDimensionsWrapper>
        <TrackInfoModal />
      </WindowDimensionsWrapper>
      <AppFooter />
    </Flex>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  currentTerm: PropTypes.string.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  idToken: PropTypes.string,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    currentTerm: getCurrentTerm(state),
    isDropdownOpen: getIsDropdownOpen(state),
    idToken: authSelectors.getIdToken(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(
      { termChange, toggleDropdown, ...mosaicActions, ...artistsActions, ...recommendedActions }, dispatch
    ),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
