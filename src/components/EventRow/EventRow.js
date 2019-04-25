import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { Route, withRouter } from "react-router-dom";

class EventRow extends Component {

  handleClick = () => {
    console.log("edit id:", this.props.row.id);
    this.props.history.push("/event/create");
    this.props.dispatch({ type: "SET_EDIT", payload: this.props.row.id });
    alert("DO YOU REALLY WANT TO EDIT");
  };

  render() {

    const event = this.props.row;

    return (
      <TableRow>

        <TableCell>
          {event.title}
        </TableCell>

        <TableCell>
          {event.end_time}
        </TableCell>

        <TableCell align="right">{event.community_id}</TableCell>

        <TableCell align="right">{event.event_name}</TableCell>

        <TableCell align="right">{event.total_attendees}</TableCell>

        <TableCell>
          <Button
            align="right"
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.handleClick}
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

export default withRouter(connect(reduxMap)(EventRow));