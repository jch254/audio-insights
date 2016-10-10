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

const Navbar = ({ idToken, dropdownOpen, toggleDropdown, handleTermChange }) => (
  <Toolbar backgroundColor="black" >
    <NavItem is="object" color="midgray">
      <IndexLink to="/">
        Home
      </IndexLink>
    </NavItem>
    {
      idToken &&
      <NavItem is="object" color="midgray">
        <Link to="/mosaic">
          Mosaic
        </Link>
      </NavItem>
    }
    {
      idToken &&
      <NavItem is="object" color="midgray">
        <Link to="/recommended">
          Recommended
        </Link>
      </NavItem>
    }
    {
      idToken &&
      <NavItem is="object" color="midgray">
        <Link to="/artists">
          Artists
        </Link>
      </NavItem>
    }
    <Space auto />
    {
      idToken &&
      <Dropdown>
        <NavItem color="midgray" onClick={() => toggleDropdown()}>
          Term
          <Arrow />
        </NavItem>
        <DropdownMenu
          right
          onDismiss={() => toggleDropdown()}
          open={dropdownOpen}
        >
          <NavItem
            onClick={() => handleTermChange(idToken, 'short_term')}
          >
            Short
          </NavItem>
          <NavItem
            onClick={() => handleTermChange(idToken, 'medium_term')}
          >
            Medium
          </NavItem>
          <NavItem
            onClick={() => handleTermChange(idToken, 'long_term')}
          >
            Long
          </NavItem>
        </DropdownMenu>
      </Dropdown>
    }
  </Toolbar>
);

Navbar.propTypes = {
  idToken: PropTypes.string,
  dropdownOpen: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  handleTermChange: PropTypes.func.isRequired,
};

export default Navbar;
