import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';

class SingleContact extends Component {

  render() {

		const contact = this.props.contact;
    return (
      <Paper className="single-contact">
        <div><b>{contact.full_name}</b></div>
        <div>{contact.email}</div>
        <div>{contact.phone_number}</div>
      </Paper>
    );
  }
}


export default SingleContact;
