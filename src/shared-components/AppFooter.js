import React from 'react';
import { Link } from 'react-router';
import { Box } from 'reflexbox';
import moment from 'moment';
import {
  Toolbar,
  Space,
  NavItem,
} from 'rebass';

const AppFooter = () => (
  <Box style={{ flex: 'none' }}>
    <Toolbar backgroundColor="black">
      <Space auto />
      <NavItem is="object" color="midgray" style={{ fontWeight: 'normal', fontSize: '12px' }}>
        <Link to="/about">
          About
        </Link>
      </NavItem>
      <NavItem is="object" color="midgray" style={{ fontWeight: 'normal', fontSize: '12px' }}>
        <Link to="/glossary">
          Glossary
        </Link>
      </NavItem>
      <NavItem color="midgray" style={{ fontWeight: 'normal', fontSize: '12px', cursor: 'default' }}>
        { '//' }
      </NavItem>
      <NavItem color="midgray" href="https://603.nz" style={{ fontWeight: 'normal', fontSize: '12px' }}>
        {`© 603.nz ${moment().year()}`}
      </NavItem>
    </Toolbar>
  </Box>
);

export default AppFooter;
