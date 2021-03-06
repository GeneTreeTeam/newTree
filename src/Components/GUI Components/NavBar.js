import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarNav,
    NavbarToggler,
    Collapse,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'mdbreact';


import { BrowserRouter as Router } from 'react-router-dom';
import {firebaseApp} from "../Signin Components/firebase";
import Logo1 from '../../assets/logo1.png'

export default class Narbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            isSignedIn: false,
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    signOut() {
        firebaseApp.auth().signOut();

    }

    render() {
        return (
            <Router>
                <Navbar color="unique-color-dark" dark expand="md" scrolling>

                    <NavbarBrand href="/">
                        <img src={Logo1}  height="30" className="d-inline-block align-top"/>
                        <strong>GeneTree</strong>
                    </NavbarBrand>

                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>

                        <NavbarNav left>
                            <NavItem active>
                                <NavLink to="#">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="#">Analysis</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="#">Payment</NavLink>
                            </NavItem>
                            <NavItem>
                                <a className="nav-link Ripple-parent" href="tree" >Tree</a>
                            </NavItem>
                            <NavItem>
                                <Dropdown>
                                    <DropdownToggle nav caret>Others</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Features</DropdownItem>
                                        <DropdownItem href="#">Pricing</DropdownItem>
                                        <DropdownItem href="#">Options</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                        </NavbarNav>

                        <NavbarNav right>
                            <NavItem>
                                <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" type="text"
                                           placeholder="Search..." aria-label="Search"/>
                                    <button className="btn-outline-blue-grey my-2 my-sm-0" type="submit">Search
                                    </button>
                                </form>
                            </NavItem>
                        </NavbarNav>

                        <NavbarNav right>
                            <div>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.signOut()}
                                >
                                    Sign Out
                                </button>

                            </div>

                        </NavbarNav>

                    </Collapse>
                </Navbar>
            </Router>
        );
    }
}