import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-geomicons';
import {
  Overlay,
  Panel,
  PanelHeader,
  Text,
  Close,
  Space,
  Heading,
  Divider,
  ButtonCircle,
} from 'rebass';
import { Flex } from 'reflexbox';

import FadeInTransition from './FadeInTransition';
import FadeImage from './FadeImage';
import PlayPause from './PlayPause';
import { actions as appActions, selectors as appSelectors } from '../app';
import { selectors as mosaicSelectors } from '../mosaic';
import { selectors as recommendedSelectors } from '../recommended';
import { getAlbumArtUrlForTrack } from '../utils';

const TrackInfoModal = ({ isModalOpen, selectedTrack, windowWidth, actions }) => {
  const mapPitchClassToKey = (pitchClass) => {
    switch (pitchClass) {
      case 0:
        return 'C';
      case 1:
        return 'C♯/D♭';
      case 2:
        return 'D';
      case 3:
        return 'D♯/E♭';
      case 4:
        return 'E';
      case 5:
        return 'F';
      case 6:
        return 'F♯/G♭';
      case 7:
        return 'G';
      case 8:
        return 'G♯/A♭';
      case 9:
        return 'A';
      case 10:
        return 'A♯/B♭';
      case 11:
        return 'B';
      default:
        return 'UNKNOWN';
    }
  };

  const mapMode = mode => (mode === 1 ? 'major' : 'minor');

  return (
    selectedTrack ?
      <FadeInTransition>
        <Overlay key="modal" open={isModalOpen} onDismiss={() => actions.closeModal()} >
          <Panel>
            <PanelHeader>
              <Text>
                {`${selectedTrack.getIn(['artists', 0, 'name'])} - ${selectedTrack.get('name')}`}
              </Text>
              <Space auto />
              <Close onClick={() => actions.closeModal()} />
            </PanelHeader>
            <Flex
              flexColumn={windowWidth <= 480}
              style={{ marginTop: '-16px', marginRight: '-16px' }}
              align="center"
            >
              <FadeImage
                src={getAlbumArtUrlForTrack(selectedTrack)}
                style={{
                  width: '300px',
                  height: '300px',
                  marginRight: '16px',
                  marginTop: '16px',
                }}
              />
              <Flex mt={2} mr={2} wrap flexColumn style={{ width: '300px' }}>
                <Heading color="black" level={3}>
                  {selectedTrack.get('name')}
                </Heading>
                <Text
                  color="black"
                >
                  {selectedTrack.get('artists').map(a => a.get('name')).join(', ')}
                </Text>
                <Text color="black">
                  {selectedTrack.getIn(['album', 'name'])}
                </Text>
                <Divider ml={0} width={150} />
                <Flex flexColumn={windowWidth > 480} style={{ marginTop: '-16px' }}>
                  <Flex flexColumn mt={2}>
                    <Text color="black">
                      {`${Math.round(selectedTrack.get('tempo'))} bpm`}
                    </Text>
                    <Text color="black">
                      {
                        `${mapPitchClassToKey(selectedTrack.get('key'))}
                          ${mapMode(selectedTrack.get('mode'))}`
                      }
                    </Text>
                  </Flex>
                  <Space auto />
                  <Flex mt={2}>
                    <PlayPause
                      previewUrl={selectedTrack.get('preview_url')}
                    />
                    <ButtonCircle
                      ml={1}
                      size={48}
                      backgroundColor="green"
                      title="Open in Spotify"
                      href={selectedTrack.getIn(['external_urls', 'spotify'])}
                      target="_blank"
                    >
                      <Icon
                        fill="white"
                        height="32px"
                        name="external"
                        width="32px"
                      />
                    </ButtonCircle>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Panel>
        </Overlay>
      </FadeInTransition>
      : null
  );
};

TrackInfoModal.propTypes = {
  actions: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  windowWidth: PropTypes.number.isRequired,
  selectedTrack: PropTypes.object,
};

TrackInfoModal.defaultProps = {
  windowWidth: 0,
  selectedTrack: null,
};

const mapStateToProps = state => (
  {
    isModalOpen: appSelectors.getIsModalOpen(state),
    selectedTrack: mosaicSelectors.getTrack(state, appSelectors.getSelectedTrackId(state)) ||
      recommendedSelectors.getRecommendedTrack(state, appSelectors.getSelectedTrackId(state)),
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({ ...appActions }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(TrackInfoModal);
