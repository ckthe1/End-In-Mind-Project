import React, { Component } from "react";

class SingleContact extends Component {

  render() {

		const contact = this.props.contact;
    return (
      <div>
        <div>{contact.full_name}</div>
        <div>{contact.email}</div>
        <div>{contact.phone_number}</div>
      </div>
    );
  }
}


export default SingleContact;
