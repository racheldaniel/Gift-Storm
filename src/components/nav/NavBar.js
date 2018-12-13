import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom'
import userSession from "./../../modules/User/UserSession"
import "./NavBar.css"


export default class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" dark expand="md" className="nav justify-content-center" id="navBar">
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to="/friends" className="text-dark">Friends</NavLink>
            </NavItem>
            <NavbarBrand tag={Link} to="/" className="text-dark mx-5"><h3>GiftStorm</h3></NavbarBrand>
            <NavItem>
              <NavLink tag={Link} to="/profile" className="text-dark">Profile</NavLink>
            </NavItem>
            <NavItem className="float-right">
              <NavLink tag={Link} onClick={() => { userSession.logOutUser() }} to="/"><Button color="primary">Logout</Button></NavLink>
            </NavItem>

          </Nav>
        </Navbar>
      </div>
    );
  }
}


