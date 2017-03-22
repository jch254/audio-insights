import React, { Component, PropTypes } from 'react';
import { Box, Flex } from 'reflexbox';
import {
  Text,
  Space,
  Heading,
} from 'rebass';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import FadeImage from '../shared-components/FadeImage';
import { getAlbumArtUrlForTrack } from '../utils';

class RecommendedTracksList extends Component {
  shouldComponentUpdate(nextProps) {
    return !Immutable.is(nextProps.recommendedTracks, this.props.recommendedTracks);
  }

  render() {
    const { recommendedTracks, onTrackClick } = this.props;

    return (
      <Box>
        {
          recommendedTracks
            .entrySeq()
            .map(([id, recommendedTrack]) =>
              <Flex
                key={id}
                align="center"
                my={2}
                style={{ cursor: 'pointer' }}
                onClick={() => onTrackClick(id)}
              >
                <FadeImage
                  src={getAlbumArtUrlForTrack(recommendedTrack)}
                  style={{
                    minWidth: '150px',
                    maxWidth: '150px',
                    minHeight: '150px',
                    maxHeight: '150px',
                    marginRight: '16px',
                  }}
                />
                <Box>
                  <Heading level={3}>
                    {recommendedTrack.get('name')}
                  </Heading>
                  <Text small>
                    {recommendedTrack.get('artists').map(a => a.get('name')).join(', ')}
                  </Text>
                  <Text small>
                    {recommendedTrack.getIn(['album', 'name'])}
                  </Text>
                </Box>
                <Space auto />
              </Flex>,
          )
        }
      </Box>
    );
  }
}

RecommendedTracksList.propTypes = {
  recommendedTracks: ImmutablePropTypes.map.isRequired,
  onTrackClick: PropTypes.func,
};

RecommendedTracksList.defaultProps = {
  onTrackClick: null,
};

export default RecommendedTracksList;
