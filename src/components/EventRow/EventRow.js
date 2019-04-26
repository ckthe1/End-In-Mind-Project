import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import niceDay from '../../niceDay';
import axios from 'axios';

class EventRow extends Component {

  handleViewDetails = () => {
    this.props.eventSelected(this.props.row);
  };

  componentDidMount() {
    // fetch attendees for this event
    axios({
      method: 'get',
      url:'/api/attendee/for-event',
      params: {id: this.props.event.id},
    })

    .then (response => {
        this.setState({attendees: response.data});
    })
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

        <TableCell >{event.community_id}</TableCell>

        <TableCell >{event.total_attendees}</TableCell>

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