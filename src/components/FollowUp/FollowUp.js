import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';

class FollowUp extends Component {

    state = {
        eventId: 2,
        event: {},
    }

    componentDidMount() {

        // get the event info for the selected event
        axios({
            method: 'GET',
            url: '/api/events/specific',
            params: {
                id: this.state.eventId,
            }
        })
        .then( response => {
            this.setState({event: response.data[0]})
        })
        .catch( error => {
            console.log(error);
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("handling submit");
        // TODO actually handle the event
    }

    render() {

        return (
            <div>
                <h1>Followup for {this.state.event.event_name}</h1>
                <form onSubmit={this.handleSubmit}>
                    <input  placeholder='event type'/>
                    <input  type="Number" placeholder='estimated attendees'/>
                    <input placeholder='comments' /> 
                    <button>Submit</button>

                </form>
            </div>
        );
    }
}


export default connect()(FollowUp);