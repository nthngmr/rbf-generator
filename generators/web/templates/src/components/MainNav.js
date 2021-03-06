import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, UncontrolledDropdown} from 'reactstrap';
import { signOut } from '@nothingmore/auth/actions';
import _ from 'lodash';
import './MainNav.css';

class MainNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      userDropdownIsOpen: false
    }
  }

  signOut = (event) => {
    event.preventDefault();
    this.closeNavbar();
    this.props.dispatch(signOut());
  }

  toggleNavbar = () => {
    this.setState({
      navbarIsOpen: !this.state.navbarIsOpen
    });
  }

  closeNavbar = (event) => {
    event && event.stopPropagation();
    this.setState({
      navbarIsOpen: false
    });
  }

  toggleUserDropdown = () => {
    this.setState({
      userDropdownIsOpen: !this.state.userDropdownIsOpen
    });
  }

  render() {

    return (
      <Navbar className="MainNav" dark color='dark' expand="lg" fixed="top">
        <NavbarBrand className="main-logo" to={`${process.env.PUBLIC_URL}/`} tag={Link}>
          <%= appname %>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={this.state.navbarIsOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} onClick={this.closeNavbar} to={`${process.env.PUBLIC_URL}/`}>
                home
              </NavLink>
            </NavItem>
            <div className="user-nav-items">
              <NavItem>
                <NavLink tag={Link} onClick={this.closeNavbar} to={`${process.env.PUBLIC_URL}/settings`}>
                  settings
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} onClick={this.signOut} to={`#`}>
                  logout
                </NavLink>
              </NavItem>
            </div>
          </Nav>
        </Collapse>

        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar isOpen={this.state.userDropdownIsOpen} toggle={this.toggleUserDropdown}>
              <DropdownToggle nav>
                <img className="avatar" alt="avatar" src={_.get(this.props, 'user.info.photoUrl', `${process.env.PUBLIC_URL}/user-icon.png`)} />
              </DropdownToggle>
              <DropdownMenu className="user-dropdown dropdown-menu-sm dropdown-menu-right" >
                <DropdownItem onClick={ () => { this.props.history.push('/settings') } }>
                  settings
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem onClick={this.signOut}>
                  logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}
export default withRouter(connect(mapStateToProps)(MainNav));
