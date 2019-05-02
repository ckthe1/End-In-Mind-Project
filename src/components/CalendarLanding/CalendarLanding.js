import React, { Component } from "react";
import './CalendarLanding.css';
import Calendar from "../Calendar/Calendar";
import Contacts from "../Contacts/Contacts";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import EventCard from "../EventCard/EventCard";
import SelectCommunity from "../SelectCommunity/SelectCommunity";


class CalendarLanding extends Component {

	state = {
		communityId: null,
	}

	componentDidMount() {
		this.props.dispatch({type: "FETCH_COMMUNITIES"});
	}


	handleClose = () => {
		this.props.dispatch({type: "EVENT_DIALOG", payload: false})
		this.props.dispatch({ type: 'CLEAR_EVENT' });
	}

	handleCommunitySelected = selection => {
		console.log('you selected community ', selection);
		this.setState({communityId: selection});

		// fetch events for the community
		this.props.dispatch({type:'FETCH_EVENTS', payload: selection});

		// Fetch the contacts for the community
		this.props.dispatch({ type: "FETCH_CONTACTS", payload: { communityID: selection }});
	}

	communityName = () => {

		// If we have a community ID, just return the name of the community of that ID.
		for (const community of this.props.communities) {
			if (community.id === this.state.communityId) return community.name;
		}

		return "All Events";
	}

  render() {
    return (
			<div className="calendar-parent">
				<div className="calendar-header">
					<SelectCommunity onSelect={this.handleCommunitySelected}/>
					<h1>{this.communityName()}</h1>
				</div>
				<div className="calendar-landing">
					<div className="calendar-space">
						<Calendar />
					</div>
					<Contacts communityId={this.state.communityId}/>
					
					
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

export default connect(reduxMap)(CalendarLanding);
