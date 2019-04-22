import React, { Component } from "react";
import {connect} from 'react-redux';




class Contacts extends Component {

    componentDidMount() {
        this.props.dispatch({type:'FETCH_CONTACTS', payload: {communityID:1} });
      }

	
  render() {

        console.log("props:", this.props);
    return (
			<div>
                    Contact Info:
                    {this.props.contacts.map((contact)=>{
                        return(
                        <ul>
                            <li>{contact.full_name}</li>
                            <li>{contact.email}</li>
                            <li>{contact.phone_number}</li>
                        </ul>
                    )})}
			</div>
		);
  }
}

const reduxMap = reduxState => {
  return reduxState;
}

export default connect(reduxMap)(Contacts);