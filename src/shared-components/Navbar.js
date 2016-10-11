import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import {
  NavItem,
  Space,
  Toolbar,
  Dropdown,
  DropdownMenu,
  Arrow,
} from 'rebass';

const Navbar = ({ isLoggedIn, isDropdownOpen, onToggleDropdown, onTermChange }) => (
  <Toolbar backgroundColor="black" >
    <NavItem is="object" color="midgray">
      <IndexLink to="/">
        Home
      </IndexLink>
    </NavItem>
    {
      isLoggedIn &&
      <NavItem is="object" color="midgray">
        <Link to="/mosaic">
          Mosaic
        </Link>
      </NavItem>
    }
    {
      isLoggedIn &&
      <NavItem is="object" color="midgray">
        <Link to="/recommended">
          Recommended
        </Link>
      </NavItem>
    }
    {
      isLoggedIn &&
      <NavItem is="object" color="midgray">
        <Link to="/artists">
          Artists
        </Link>
      </NavItem>
    }
    <Space auto />
    {
      isLoggedIn &&
      <Dropdown>
        <NavItem color="midgray" onClick={() => onToggleDropdown()}>
          Term
          <Arrow />
        </NavItem>
        <DropdownMenu
          right
          onDismiss={() => onToggleDropdown()}
          open={isDropdownOpen}
        >
          <NavItem
            onClick={() => onTermChange('short_term')}
          >
            Short
          </NavItem>
          <NavItem
            onClick={() => onTermChange('medium_term')}
          >
            Medium
          </NavItem>
          <NavItem
            onClick={() => onTermChange('long_term')}
          >
            Long
          </NavItem>
        </DropdownMenu>
      </Dropdown>
    }
  </Toolbar>
);

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  onToggleDropdown: PropTypes.func.isRequired,
  onTermChange: PropTypes.func.isRequired,
};

export default Navbar;
