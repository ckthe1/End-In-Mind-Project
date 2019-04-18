import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventCard from "../EventCard/EventCard";
import { connect } from 'react-redux';
import Event from "../../classes/Event";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

const DnDCalendar = withDragAndDrop(Calendar);

class CalendarView extends Component {

  componentDidMount() {
    this.props.dispatch({type:'FETCH_EVENTS'});
  }

  onEventResize = (type, { event, start, end, allDay }) => {
    console.log('event resize type', type);
    console.log(event);
  };


  onEventDrop = ({ event, start, end, allDay }) => {
    // console.log(start);
  };

  createNewEvent = selection => {

    // Create the new event based on the selected dates
    const newEvent = new Event(this.props.events.length, "my fun event",
	"idk", "tony", selection.start, selection.end);
	
	
	/**dispatch an action to set the 'eventType' to 'new' so that the 
	 * user can set the properties of the event before submitting */
	this.props.dispatch({type:"SET_EVENT_TYPE", payload: 'new'});


    // Dispatch to make this the selected event
    this.eventSelected(newEvent);
  }

  	// this.props.dispatch({type:"ADD_EVENT", payload: newEvent});


  eventSelected = event => {
    this.props.dispatch({type:"SET_EVENT", payload: event})
  }

  calendarStyle = {
    height: "100vh",
    width: "90%",
  }

  render() {

    // console.log('calendar is looking at', this.props.events);

    return (
      <div className="App">
        <header className="App-header">
        </header>

        <DnDCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.props.events}
          onSelectEvent={this.eventSelected}
          onEventDrop={this.onEventDrop}
          style={this.calendarStyle}
        />
      </div>
    );
  }
}

const reduxMap = reduxState => {
  return reduxState;
}

export default connect(reduxMap)(CalendarView);
