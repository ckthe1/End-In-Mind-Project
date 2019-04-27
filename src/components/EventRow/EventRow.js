import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import niceDay from '../../niceDay';
import axios from 'axios';

class EventRow extends Component {

  state = {
    attendees: [],
  }

  handleViewDetails = () => {

    // dispatch to set this event's attendees to the redux state,
    // so they can be displayed in more detail for another component.
    this.props.dispatch({type: 'SET_ATTENDEES', payload: this.state.attendees});

    // delegate event selection to a function from the props, so a 
    // parent component can run functionality using this row's props.
    this.props.eventSelected(this.props.row);
  };

  componentDidMount() {

    // Fetch the communities so we can show the correct community
    // name for each event.
    this.props.dispatch({type: 'FETCH_COMMUNITIES'});

    // fetch attendees for this event
    axios({
      method: 'get',
      url:'/api/attendee/for-event',
      params: {id: this.props.row.id},
    })

    .then (response => {
        this.setState({attendees: response.data});
    })
  }

  communityName = () => {
    for (let community of this.props.communities) {
      if (community.id == this.props.row.community_id) {
        return community.name;
      }
    }

    return 'N/A'
  }

  render() {

    const event = this.props.row;

    return (
      <TableRow>

        <TableCell>
          {event.title}
        </TableCell>

        <TableCell>
          {niceDay(event.end_time)}
        </TableCell>

        <TableCell >{this.communityName()}</TableCell>

        <TableCell >{this.state.attendees.length}</TableCell>

        <TableCell>
          <Button
            type="submit"
            color="primary"
            onClick={this.handleViewDetails}
          >
            View Details
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

EventRow.propTypes = {
  classes: PropTypes.object.isRequired
};

const reduxMap = reduxState => {
  return reduxState;
};

export default connect(reduxMap)(EventRow);