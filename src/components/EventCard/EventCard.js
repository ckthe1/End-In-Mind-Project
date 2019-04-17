import React, { Component } from "react";
import './EventCard.css';
import {connect} from 'react-redux';

class EventCard extends Component {

	onClick = eventId => () => {
		this.props.dispatch({type: "REMOVE_EVENT", payload: eventId});
	}

  render() {

		const myEvent = this.props.selectedEvent;

    return (
			<div className="event-card">
				{myEvent && (
					<div>
						<p>{myEvent.title}</p>
						<p>{myEvent.description}</p>
						{myEvent.start && <p>{myEvent.start.toString()}</p>}
						{myEvent.end && <p>{myEvent.end.toString()}</p>}
						<p>{myEvent.author}</p>
						<button onClick={this.onClick(myEvent.id)}>Delete</button>
						<button onClick={this.onClick(myEvent.id)}>Edit</button>

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
