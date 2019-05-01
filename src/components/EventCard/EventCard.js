import React, { Component } from "react";
import './EventCard.css';
import {connect} from 'react-redux';
import niceDay from '../../niceDay';
import niceTime from '../../niceTime';
import AttendeeTable from "../AttendeeTable/AttendeeTable";


class EventCard extends Component {

  render() {
		const myEvent = this.props.reduxState.selectedEvent;

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
							<p><b>{niceDay(myEvent.start)}</b></p>
							<div className="date-range">
								{myEvent.start && <p>{niceTime(myEvent.start)}</p>}
								<div>to</div>
								{myEvent.end && <p>{niceTime(myEvent.end)}</p>}
							</div>
						</div>

						<div className="event-contact">
							<h4>Event Contact</h4>
							<p>{myEvent.contact_name}</p>
							<p>{myEvent.contact_email}</p>
							<p>{myEvent.contact_phone}</p>
						</div>

						{this.props.showAll && (
							<div>
								<h3>Attendees</h3>
								<AttendeeTable 
									event={myEvent} 
									attendees={this.props.reduxState.attendees}/>
							</div>
						)}

					</div>
				)}
			</div>
		);
  }
}

const reduxMap = reduxState => {
  return {...this.props, reduxState}
}

export default connect(reduxMap)(EventCard);
