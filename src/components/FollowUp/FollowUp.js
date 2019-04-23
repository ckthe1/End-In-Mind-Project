import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';

class FollowUp extends Component {

    state = {
        event: {},
        queryOk: false,
    }

    componentDidMount() {

        // The event ID is provided in the URL as a query. We find which event to display using this.
        let url = window.location.href;
        url = url.replace('#', '');
        const queries = queryString.parseUrl(url).query;

        // If there was no event query in the URL, then remember that 
        // the query isnt ok. We'll just render something to direct the user to home page.
        if (!queries.event) {
            console.log('No query found for event id.')
            return;
        }

        this.setState({queryOk: true});
        const eventId = queries.event;

        // get the event info for the selected event
        axios({
            method: 'GET',
            url: '/api/events/specific',
            params: {
                id: eventId,
            }
        })
        .then( response => {
            console.log('found event', response.data[0]);
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