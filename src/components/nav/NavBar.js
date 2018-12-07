import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand
} from 'reactstrap';
import { Link } from 'react-router-dom'
import userSession from "./../../modules/User/UserSession"


export default class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" dark expand="md" className="nav justify-content-center">
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to="/friends" className="text-dark">Friends</NavLink>
            </NavItem>
            <NavbarBrand tag={Link} to="/" className="text-dark mx-5">GiftStorm</NavbarBrand>
            <NavItem>
              <NavLink tag={Link} to="/occasions" className="text-dark">Occasions</NavLink>
            </NavItem>
            <NavItem>
              {/* TODO: redirect to login */}
              <NavLink tag={Link} onClick={() => { userSession.logOutUser() }} to="/">Logout</NavLink>
            </NavItem>

          </Nav>
        </Navbar>
      </div>
    );
  }
}


