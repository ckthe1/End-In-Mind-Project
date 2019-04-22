import React, { Component } from "react";
import {connect} from 'react-redux';

class Dashboard extends Component {

  render() {

    return (
			<div>
				<p>DashBoard</p>
			</div>
		);
  }
}

const reduxMap = reduxState => {
  return reduxState;
}

export default connect(reduxMap)(Dashboard);