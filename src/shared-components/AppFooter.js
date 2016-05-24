import React from 'react';
import { Link } from 'react-router';
import Icon from 'react-geomicons';
import {
  Toolbar,
  Space,
  NavItem,
} from 'rebass';
import { Box } from 'reflexbox';

const AppFooter = () => (
  <Box style={{ flex: 'none' }}>
    <Toolbar backgroundColor="black">
      <NavItem href="https://github.com/jch254/audio-insights" target="_blank" color="midgray">
        <Icon name="github" width="24px" height="24px" />
      </NavItem>
      <Space auto />
      <NavItem is="object" color="midgray">
        <Link to="/about" children="About" />
      </NavItem>
      <NavItem is="object" color="midgray">
        <Link to="/glossary" children="Glossary" />
      </NavItem>
      <NavItem color="midgray" children="//" style={{ cursor: 'default' }} />
      <NavItem color="midgray" href="https://603.nu" children="© 603.nu 2016" />
    </Toolbar>
  </Box>
);

export default AppFooter;
