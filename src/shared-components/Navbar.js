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
      <IndexLink to="/" children="Home" />
    </NavItem>
    {
      idToken &&
      <NavItem is="object" color="midgray">
        <Link to="/mosaic" children="Mosaic" />
      </NavItem>
    }
    {
      idToken &&
      <NavItem is="object" color="midgray">
        <Link to="/recommended" children="Recommended" />
      </NavItem>
    }
    {
      idToken &&
      <NavItem is="object" color="midgray">
        <Link to="/artists" children="Artists" />
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
            children="Short"
          />
          <NavItem
            onClick={() => handleTermChange(idToken, 'medium_term')}
            children="Medium"
          />
          <NavItem
            onClick={() => handleTermChange(idToken, 'long_term')}
            children="Long"
          />
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
