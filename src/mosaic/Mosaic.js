import React, { Component, PropTypes } from 'react';
import { Flex } from 'reflexbox';

import FadeImage from '../components/FadeImage';

class Mosaic extends Component {
  getColumnCount() {
    let columns = 5;

    if (this.props.windowWidth <= 480) {
      columns = 2;
    } else if (this.props.windowWidth <= 768) {
      columns = 3;
    } else if (this.props.windowWidth <= 1024) {
      columns = 4;
    }

    return columns;
  }

  render() {
    const columnWidth = Math.floor(100 / this.getColumnCount());
    const mosaicTiles = this.props.tilesArray.map((t, index) =>
      <FadeImage
        key={index}
        src={t.url}
        style={{ width: `${columnWidth}%`, height: 'auto', cursor: 'pointer' }}
        onClickHandler={t.onClickHandler}
      />
    );

    return (
      <Flex
        key="mosaic"
        py={3}
        wrap
        align="center"
        justify="center"
        style={{ flex: '1 0 auto' }}
      >
        {mosaicTiles}
      </Flex>
    );
  }
};

Mosaic.propTypes = {
  tilesArray: PropTypes.array.isRequired,
  windowWidth: PropTypes.number.isRequired,
};

Mosaic.defaultProps = {
  tilesArray: [],
  windowWidth: 0,
};

export default Mosaic;
