import React, { Component } from "react";
import { connect } from "react-redux";
import SingleContact from "./SingleContact";
import './Contacts.css';


class Contacts extends Component {

  render() {
    return (
      <div className="contact-space">
        <h3>Contact Info</h3>
        {
          this.props.contacts.map(contact => 
          <SingleContact contact={contact} />)
        }
      </div>
    );
  }
}

const reduxMap = reduxState => {
  return reduxState;
};

export default connect(reduxMap)(Contacts);
