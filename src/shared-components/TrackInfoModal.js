import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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

class TrackInfoModal extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    windowWidth: PropTypes.number.isRequired,
    selectedTrack: PropTypes.object,
  };

  static defaultProps = {
    windowWidth: 0,
  };

  closeModal = () => {
    this.props.dispatch(appActions.closeModal());
  }

  mapPitchClassToKey = pitchClass => {
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

  mapMode = mode => (mode === 1 ? 'major' : 'minor');

  render() {
    const { isModalOpen, selectedTrack, windowWidth } = this.props;

    return (
      selectedTrack ?
        <FadeInTransition>
          <Overlay key="modal" open={isModalOpen} onDismiss={this.closeModal} >
            <Panel>
              <PanelHeader>
                <Text>
                  {`${selectedTrack.getIn(['artists', 0, 'name'])} - ${selectedTrack.get('name')}`}
                </Text>
                <Space auto />
                <Close onClick={this.closeModal} />
              </PanelHeader>
              <Flex
                column={windowWidth <= 480}
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
                <Flex mt={2} mr={2} wrap column style={{ width: '300px' }}>
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
                  <Flex column={windowWidth > 480} style={{ marginTop: '-16px' }}>
                    <Flex column mt={2}>
                      <Text color="black">
                        {`${Math.round(selectedTrack.get('tempo'))} bpm`}
                      </Text>
                      <Text color="black">
                        {
                          `${this.mapPitchClassToKey(selectedTrack.get('key'))}
                            ${this.mapMode(selectedTrack.get('mode'))}`
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
  }
}

const mapStateToProps = state => (
  {
    isModalOpen: appSelectors.getIsModalOpen(state),
    selectedTrack: mosaicSelectors.getTrack(state, appSelectors.getSelectedTrackId(state)) ||
      recommendedSelectors.getRecommendedTrack(state, appSelectors.getSelectedTrackId(state)),
  }
);

export default connect(mapStateToProps)(TrackInfoModal);
