import React, { Component, PropTypes } from 'react';

class WindowDimensionsWrapper extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  }

  render() {
    return (React.cloneElement(this.props.children, { windowWidth: this.state.windowWidth }));
  }
}

export default WindowDimensionsWrapper;
