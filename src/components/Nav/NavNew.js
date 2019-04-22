import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavNew.css';


class NavNew extends Component {

    state = {
        eventDropdownDisplay: 'none',
        communityDropdownDisplay: 'none',
    }

    toggleMenu = () => {
        let mainNav = document.getElementById('js-menu');
        mainNav.classList.toggle('active');
    }

    handleButtonDropdown = buttonName => () => {
        buttonName === 'event' && this.state.eventDropdownDisplay === 'none' ?
            this.setState({ eventDropdownDisplay: 'block' }) : this.setState({ eventDropdownDisplay: 'none' });

        buttonName === 'community' && this.state.communityDropdownDisplay === 'none' ?
            this.setState({ communityDropdownDisplay: 'block' }) : this.setState({ communityDropdownDisplay: 'none' });
    }

    render() {


        return (
            <nav className="navbar">
                <span className="navbar-toggle" id="js-navbar-toggle">
                    <i className="fas fa-bars" onClick={this.toggleMenu}></i>
                </span>
                <a href="/" className="logo"><img src="images/eim_logo_horizontal.png" alt="End In Mind logo" /></a>
                <ul className="main-nav" id="js-menu">
                    <li>
                        <Link to="/dashboard" className="nav-links">Dashboard</Link>
                    </li>
                    <li className="dropdown">
                        <button onClick={this.handleButtonDropdown('community')} className="dropbtn">Community
                        <i className="fa fa-caret-down"></i>
                        </button>
                        <div style={{ display: this.state.communityDropdownDisplay }} className="dropdown-content">
                            <Link to="/dashboard" >Add Admin</Link>
                        </div>
                    </li>
                    <li className="dropdown">
                        <button onClick={this.handleButtonDropdown('event')} className="dropbtn">Events
                         <i className="fa fa-caret-down"></i>
                        </button>
                        <div style={{ display: this.state.eventDropdownDisplay }} className="dropdown-content">
                            <Link to="/event/view" >View</Link>
                            <Link to="/event/create" >Create</Link>
                        </div>
                    </li>
                    <li>
                        <Link to="/files" className="nav-links">Files</Link>
                    </li>
                    <li>
                        <Link to="/calendar" className="nav-links">Calendar</Link>
                    </li>
                    <li>
                        <Link onClick={() => this.props.dispatch({ type: 'LOGOUT' })} className="nav-links">Log Out</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default connect()(NavNew);
