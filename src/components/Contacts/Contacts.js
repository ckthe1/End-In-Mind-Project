import React, { Component } from "react";
import {connect} from 'react-redux';




class Contacts extends Component {

    componentDidMount() {
        this.props.dispatch({type:'FETCH_CONTACTS', payload: {communityID:1} });
      }

	
  render() {


    return (
			<div>
                <p>
                    Contact Info:
                    {JSON.stringify(this.props.contacts)}
                </p>
			</div>
		);
  }
}

const reduxMap = reduxState => {
  return reduxState;
}

export default connect(reduxMap)(Contacts);