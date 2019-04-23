import React, { Component } from "react";
import './ViewEventList.css';
import { connect } from 'react-redux';

class ViewEventList extends Component {

    componentDidMount () {
        this.fetchEvent();
    };
    fetchEvent = () => {
        this.props.dispatch({ type: 'FETCH_EVENTS'})
    }// get event infos

    render() {
       console.log('this.props.eventReducer:', this.props.events);

        return (
            <div className="event-list">
                <table>
                    <tbody>           
                    {this.props.events.map((eventItem) => {
                    
                           <div>
                                <tr>
                                    <td>Event Name: {eventItem.event_name}</td>
                                    <td>Location: {eventItem.location}</td>
                                    <td>Date: {eventItem.crrated_at}</td>
                                    <td>Start time: {eventItem.start_time}</td>
                                    <td>End time: {eventItem.end_time}</td>
                                    <td>Event Organizer</td>
                                </tr>
                                <tr>
                                    <td>Picture here, optional</td>
                                    <td>Description: {eventItem.description}</td>
                                    <td>
                                        <div>Name: {eventItem.contact_name}</div>
                                        <div>Email: {eventItem.contact_email}</div>
                                        <div>Phone: {eventItem.contact_phone}</div>
                                    </td>
                                    <td>
                                        <button type="button"> Edit Event</button>
                                        <button type="button"> Run Event</button>
                                    </td>
                                </tr>   
                            </div>                    
                        ;
                    })}                      
                    </tbody>
                </table>
            </div>
        );
    }
}

const reduxMap = reduxState => {
    return reduxState;
}

export default connect(reduxMap)(ViewEventList);