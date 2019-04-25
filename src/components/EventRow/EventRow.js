import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import niceDay from '../../niceDay';

class EventRow extends Component {

  handleViewDetails = () => {
    this.props.eventSelected(this.props.row);
  };

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