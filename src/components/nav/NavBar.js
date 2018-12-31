import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  Button,
  Collapse,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom'
import userSession from "./../../modules/User/UserSession"
import "./NavBar.css"


export default class NavBar extends Component {
  state = {
    isOpen: false
  }

  //function controls dropdown toggle
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" dark expand="md" className="nav" id="navBar">
          <NavbarToggler onClick={this.toggle} />

            <Nav navbar>
              <div className="nav mainNav" id="mainNav">
                <NavItem>
                  <NavLink tag={Link} to="/friends" className="text-dark mx-3">Friends</NavLink>
                </NavItem>
                <NavbarBrand tag={Link} to="/" className="text-dark mx-5"><h3>GiftStorm</h3></NavbarBrand>
                <NavItem>
                  <NavLink tag={Link} to="/occasions" className="text-dark mx-3" >Occasions</NavLink>
                </NavItem>
              </div>
              <div className="nav" id="secNav">
                <UncontrolledDropdown nav inNavbar >
                <Collapse isOpen={this.state.isOpen} navbar>
                  <DropdownToggle nav caret className="text-dark">
                    {this.props.userName}
                  </DropdownToggle>
                  <DropdownMenu id="dropdown">
                    <DropdownItem>
                      <NavLink tag={Link} to="/profile" className="text-dark">Profile</NavLink>
                    </DropdownItem>
                    <DropdownItem >
                      <NavLink className="text-dark" tag={Link} onClick={() => { userSession.logOutUser() }} to="/">Logout</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                  </Collapse>
                </UncontrolledDropdown>
              </div>


            </Nav>

        </Navbar>
      </div>
    );
  }
}


