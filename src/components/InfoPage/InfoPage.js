import React, { Component } from "react";
import Calendar from "../Calendar/Calendar";
import Contacts from "../Contacts/Contacts"


class InfoPage extends Component {
  render() {
    return (
			<div>
        <Calendar />
				<Contacts />
			</div>
		);
  }
}

export default InfoPage;

