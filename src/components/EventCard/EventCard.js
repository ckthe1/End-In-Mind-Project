import React, { Component } from "react";
import './EventCard.css';
import {connect} from 'react-redux';

class EventCard extends Component {

  render() {
		const myEvent = this.props.selectedEvent;

    return (
			<div className="event-card">
				{  (
					<div>						
						<p>{myEvent.title}</p>
						<p>{myEvent.description}</p>
						{myEvent.start && <p>{myEvent.start.toString()}</p>}
						{myEvent.end && <p>{myEvent.end.toString()}</p>}
						<p>{myEvent.author}</p>
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
