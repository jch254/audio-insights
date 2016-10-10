import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Box } from 'reflexbox';
import {
  PageHeader,
  Container,
  Message,
} from 'rebass';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { artistsRequest } from './actions';
import { getArtists, getError, getIsFetching } from './selectors';

import FadeImage from '../shared-components/FadeImage';
import FadeInTransition from '../shared-components/FadeInTransition';
import FullscreenLoader from '../shared-components/FullscreenLoader';
import { selectors as authSelectors } from '../auth';

class ArtistsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    idToken: PropTypes.string.isRequired,
    artists: ImmutablePropTypes.map.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.object,
  };

  componentDidMount() {
    const { dispatch, idToken } = this.props;

    dispatch(artistsRequest(idToken));
  }

  shouldComponentUpdate(nextProps) {
    return !Immutable.is(nextProps.artists, this.props.artists);
  }

  render() {
    const { isFetching, artists, error } = this.props;

    return (
      isFetching ?
        <FullscreenLoader /> :
        <FadeInTransition>
          <Box key="artists" style={{ flex: '1 0 auto' }}>
            <Container pb={2}>
              <PageHeader my={2} py={2} description="Blog-style feed" heading="Top Artists" />
              {
                error &&
                <Message theme="error">
                  { `Error: ${JSON.stringify(error)}` }
                </Message>
              }
              {
                artists
                  .entrySeq()
                  .map(([id, artist]) =>
                    <FadeImage
                      key={id}
                      src={
                        artist.getIn(['images', '1', 'url']) || artist.getIn(['images', '0', 'url'])
                      }
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        display: 'block',
                        marginBottom: '16px',
                      }}
                    />
                  )
              }
            </Container>
          </Box>
        </FadeInTransition>
    );
  }
}

const mapStateToProps = state => (
  {
    idToken: authSelectors.getIdToken(state),
    artists: getArtists(state),
    isFetching: getIsFetching(state),
    error: getError(state),
  }
);

export default connect(mapStateToProps)(ArtistsPage);
