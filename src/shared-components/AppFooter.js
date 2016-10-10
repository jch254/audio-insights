import React from 'react';
import { Link } from 'react-router';
import {
  Toolbar,
  Space,
  NavItem,
} from 'rebass';
import { Box } from 'reflexbox';

const AppFooter = () => (
  <Box style={{ flex: 'none' }}>
    <Toolbar backgroundColor="black">
      <Space auto />
      <NavItem is="object" color="midgray">
        <Link to="/about">
          About
        </Link>
      </NavItem>
      <NavItem is="object" color="midgray">
        <Link to="/glossary">
          Glossary
        </Link>
      </NavItem>

      <NavItem color="midgray" style={{ cursor: 'default' }}>
        { '//' }
      </NavItem>
      <NavItem color="midgray" href="https://603.nu">
        © 603.nu 2016
      </NavItem>
    </Toolbar>
  </Box>
);

export default AppFooter;
