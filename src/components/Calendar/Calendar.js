import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Container from "../Container/Container";
import EventCard from "../EventCard/EventCard";
import { connect } from 'react-redux';
import Event from "../../classes/Event";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

const DnDCalendar = withDragAndDrop(Calendar);

class CalendarView extends Component {

  onEventResize = (type, { event, start, end, allDay }) => {
    console.log('event resize type', type);
    console.log(event);
  };


  onEventDrop = ({ event, start, end, allDay }) => {
    // console.log(start);
  };

  slotSelected = selection => {

    // Create the new event based on the selected dates
    const newEvent = new Event(this.props.events.length, "my fun event",
    "idk", "tony", selection.start, selection.end);

    // Dispatch to add the event to the array of events in redux
    this.props.dispatch({type:"ADD_EVENT", payload: newEvent});

    // Dispatch to make this the selected event
    this.eventSelected(newEvent);
  }

  eventSelected = event => {
    this.props.dispatch({type:"SET_EVENT", payload: event})
  }

  calendarStyle = {
    height: "100vh",
    width: "90%",
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>

        <Container>
        <DnDCalendar
          selectable
          defaultDate={new Date()}
          defaultView="month"
          events={this.props.events}
          onSelectEvent={this.eventSelected}
          onSelectSlot={this.slotSelected}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={this.calendarStyle}
        />
        <EventCard />
        </Container>
      </div>
    );
  }
}

const reduxMap = reduxState => {
  return reduxState;
}

export default connect(reduxMap)(CalendarView);
