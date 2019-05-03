import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import './FollowUp.css'


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: 8,
    marginRight: 8,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4
  },
  card: {
    // maxWidth: 345,
  },
  media: {
    height: 140
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});


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
          <div className="followUp">
        <Typography gutterBottom variant="h4" component="h4" style={{ marginBottom: '0px' }}>
   
           Followup for {event.event_name}
        </Typography>
        <Typography gutterBottom component="p" style={{ fontSize: '13px', marginBottom: '0' }}>

            {event.description}
        </Typography>
            <form onSubmit={this.handleSubmit}>
            <div>
              {/* <input
                placeholder="comments"
                value={this.state.comments}
                onChange={this.onCommentsChanged}
              /> */}

              <TextField
                value={this.state.comments}
                onChange={this.onCommentsChanged}
                id="standard-full-width"
                style={{ margin: 8 }}
                placeholder="Comments"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
              </div>
            </form>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </div>
        );
    }
}


export default withStyles(styles)(connect()(FollowUp));