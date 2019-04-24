import React, { Component } from "react";
import { connect } from "react-redux";
import SingleContact from "./SingleContact";



class Contacts extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_CONTACTS",
      payload: { communityID: 1 }
    });
  }

  render() {
    return (
      <div>
        Contact Info
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
