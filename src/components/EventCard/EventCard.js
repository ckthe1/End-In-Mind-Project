import React, { Component } from "react";
import './EventCard.css';
import {connect} from 'react-redux';
import niceDay from '../../niceDay';
import niceTime from '../../niceTime';


class EventCard extends Component {

  render() {
		const myEvent = this.props.selectedEvent;

		console.log(myEvent);

    return (
			<div className="event-card">
				{  (
					<div>						
						<h1>{myEvent.title}</h1>
						<h4>Description</h4>
						<br />
						<p>{myEvent.description}</p>
						< br />
						<div className="schedule">
							<p><b>{niceDay(myEvent.start.toString())}</b></p>
							<div className="date-range">
								{myEvent.start && <p>{niceTime(myEvent.start.toString())}</p>}
								<div>to</div>
								{myEvent.end && <p>{niceTime(myEvent.end.toString())}</p>}
							</div>
						</div>
						<div className="event-contact">
						<h4>Event Contact</h4>
						<p>{myEvent.contact_name}</p>
						<p>{myEvent.contact_email}</p>
						<p>{myEvent.contact_phone}</p>
						</div>

					</div>
				)}
			</div>
		);
  }
}

const reduxMap = reduxState => {
  return reduxState;
}

export default connect(reduxMap)(EventCard);
