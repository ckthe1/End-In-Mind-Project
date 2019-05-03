import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from 'react-redux';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class CalendarView extends Component {

  componentDidMount() {
    // Dispatch a saga to get all the events from the server
    this.props.dispatch({type:'FETCH_EVENTS'});
  }

 


  eventSelected = event => {
    this.props.dispatch({type:"SET_EVENT", payload: event});
    this.props.dispatch({type:"EVENT_DIALOG", payload: true});
  }

  calendarStyle = {
    height: "80vmin",
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
        </header>

        <Calendar
          defaultDate={new Date()}
          defaultView="month"
          views={['month']}
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