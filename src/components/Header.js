import React from "react";
import { Navbar, NavbarBrand, Input } from "reactstrap";
import "./Header.css";
import PropTypes from "prop-types";

export default function Header({ search, handleSearchChange }) {
  return (
    <div>
      <Navbar id="header-navbar">
        <NavbarBrand id="header-nav-brand">PhoneBook</NavbarBrand>
        <Input
          id="filter-input"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for people..."
        />
      </Navbar>
    </div>
  );
}

Header.propTypes = {
  search: PropTypes.string,
  handleSearchChange: PropTypes.func,
};
