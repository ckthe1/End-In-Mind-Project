import React, { Component } from "react";
import './CalendarLanding.css';
import Calendar from "../Calendar/Calendar";
import Contacts from "../Contacts/Contacts";

class Container extends Component {
  render() {
    return (
			<div className="calendar-landing">
				<div className="calendar-space">
					<Calendar />
				</div>
				<div className="contact-space">
					<Contacts />
				</div>
			</div>
		);
  }
}

export default Container;
