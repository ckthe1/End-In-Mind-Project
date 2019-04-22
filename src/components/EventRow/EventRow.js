import React, { Component } from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class EventRow extends Component {

  render() {

    return (
        <TableRow key={this.props.row.id}>
        <TableCell component="th" scope="row">
          {this.props.row.date}
        </TableCell>
        <TableCell align="right">{this.props.row.community}</TableCell>
        <TableCell align="right">{this.props.row.eventType}</TableCell>
        <TableCell align="right">{this.props.row.attendees}</TableCell>
        <TableCell align="right">{this.props.row.expectedAttendees}</TableCell>
        <TableCell align="right">{this.props.row.demographics}</TableCell>
        <TableCell align="right">{this.props.row.income}</TableCell>
        <TableCell align="right"><Button>Edit</Button></TableCell>
      </TableRow>
		);
  }
}

EventRow.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const reduxMap = reduxState => {
    return reduxState;
}

export default withStyles(withStyles)(connect(reduxMap)(EventRow));