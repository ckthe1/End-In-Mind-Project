import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';

class FollowUp extends Component {

    state = {
        event: {},
        queryOk: false,
        comments: '',
    }

    componentDidMount() {
        this.refreshEvent();
    }

    refreshEvent = () => {

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

            // If there were no events with the given ID, update the state
            // so we can let the user now.
            if (response.data.length < 1) {
                this.setState({queryOk: false});

            // If there were events found, (it really should only be 1 event)
            // then put the event in state so we can display the feedback form.
            }else {
                this.setState({event: response.data[0]})
            }
        })
        .catch( error => {
            console.log(error);
        })
    }

    onCommentsChanged = event => {
        this.setState({comments: event.target.value});
    }

    // The parameter 'event' here refers to the DOM event, not like, one of our calendar events
    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.comments.length < 1) {
            alert('Please enter your comments before submitting!');
            return;
        }

        console.log(this.state.event);

        axios({
            method: 'PUT',
            url: '/api/events/followup',
            params: {
                eventId: this.state.event.id,
                comments: this.state.comments,
            }
        })
        .then(response => {
            this.setState({comments: ''});
            this.refreshEvent();
        })

        .catch(error => {
            console.log('error submitting followup', error);
            alert("Something went wrong! Please try again in a few minutes");
        })
    }

    render() {

        // Render for missing events
        if (!this.state.queryOk) {
            return (
                <div>
                    <h1>Event Not Found</h1>
                    <p>It looks like the event you're looking for isn't here!</p>
                </div>
            )
        }

        const event = this.state.event;

        // If the event already has a followup - we determine this by checking if
        // followup comments is null
        if (event.follow_up_comments != null) {
            return (
                <div>
                    <h2>Thanks for your feedback!</h2>
                </div>
            )
        }

        return (
            <div>
                <h1>Followup for {event.event_name}</h1>
                <p>{event.description}</p>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder='comments' 
                        value={this.state.comments}
                        onChange={this.onCommentsChanged}/> 
                    <button>Submit</button>

                </form>
            </div>
        );
    }
}


export default connect()(FollowUp);