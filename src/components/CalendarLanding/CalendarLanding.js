import React, { Component } from "react";
import './CalendarLanding.css';
import Calendar from "../Calendar/Calendar";
import Contacts from "../Contacts/Contacts";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import EventCard from "../EventCard/EventCard";

class Container extends Component {


	handleClose = () => {
		this.props.dispatch({type: "EVENT_DIALOG", payload: false})
	}

  render() {
    return (
			<div>
				<div className="calendar-landing">
					<div className="calendar-space">
						<Calendar />
					</div>
					<div className="contact-space">
						<Contacts />
					</div>
				</div>
				<Dialog
					onClose={this.handleClose}
					open={this.props.eventDialog}
				>
					<EventCard />
				</Dialog>
			</div>
		);
  }
}

const reduxMap = reduxState => reduxState;

export default connect(reduxMap)(Container);
