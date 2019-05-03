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
    }

    handleClose = () => {
        console.log('handleCloseclicked')
        this.setState({
            eventDropdownDisplay: 'none',
            communityDropdownDisplay: 'none',
        })
    }

    checkOutsideCloseClick = () => {
        if (this.props.dropDownDisplay === 'none') {
            this.setState({
                eventDropdownDisplay: 'none'
            })
        }
    }


    render() {
        console.log('this.props.user:', this.props.user);
        console.log('props dropdown display', this.props.dropDownDisplay)   
        return (
            <nav className="navbar">          
                <span className="navbar-toggle" id="js-navbar-toggle">
                    <i className="fas fa-bars" onClick={this.toggleMenu}></i>
                </span>
                <a href="/" className="logo"><img src="images/eim_logo_horizontal.png" alt="End In Mind logo" /></a>                
                <ul className="main-nav" id="js-menu">

                    {this.props.user.is_super_admin === true && (                     
                        <li>
                            <Link to="/dashboard" className="nav-links">Dashboard</Link>
                        </li>
                    )}
                    {(this.props.user.is_super_admin === true || this.props.user.is_community_admin === true )&&(                                        
                        <li>
                            <Link to="/adminselect" className="nav-links">Users</Link>
                        </li>                    
                    )}

                    {this.props.user.id && (
                        <li className="dropdown">
                            <button onClick={this.handleButtonDropdown('event')} className="dropbtn">Events
                            <i className="fa fa-caret-down"></i>
                            </button>
                            <div style={{ display: this.state.eventDropdownDisplay }} className="dropdown-content">
                                <Link to="/event/view" onClick={this.handleClose}>View</Link>
                                <Link to="/event/create" onClick={this.handleClose} >Create</Link>
                            </div>
                        </li>
                    )}

                    {this.props.user.id && (
                        <li>
                            <Link to="/files" className="nav-links">Files</Link>
                        </li>                      
                    )} 
                      
                    <li>
                        <Link to="/calendar" className="nav-links">Calendar</Link>
                    </li>
                    {this.props.user.id ?  
                    <li>
                        <Link onClick={() => this.props.dispatch({ type: 'LOGOUT' })} className="nav-links">Log Out</Link>
                    </li> :
                    <li>
                        <Link to="/login" className="nav-links" onClick={() => {this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });}}
                        >Log In</Link>
                    </li>
                    }                
                </ul>              
            </nav>
        );
    }
}
const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(NavNew);
