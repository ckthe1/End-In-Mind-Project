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
import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Route, withRouter } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: cyan,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },

});


class EventRow extends Component {

  handleClick = ()=> {
    console.log('edit id:', this.props.row.id)
    this.props.history.push('/event/create')
    this.props.dispatch({ type: 'SET_EDIT', payload: this.props.row.id});
    alert('DO YOU REALLY WANT TO EDIT');

  };

  render() {
    console.log('this.props.row:', this.props.row);
    
    return (
      <MuiThemeProvider theme={theme}>
        <TableRow key={this.props.row.id}>
        <TableCell component="th" scope="row">
          {this.props.row.event_date}
        </TableCell>
        <TableCell align="right">{this.props.row.community}</TableCell>
        <TableCell align="right">{this.props.row.event_name}</TableCell>
        <TableCell align="right">{this.props.row.total_attendees}</TableCell>
        {/* <TableCell align="right">{this.props.row.expectedAttendees}</TableCell> */}
        {/* <TableCell align="right">{this.props.row.demographics}</TableCell> */}
        {/* <TableCell align="right">{this.props.row.income}</TableCell> */}
        <TableCell ><Button align="right" type="submit" variant="contained" color="primary"
          onClick={this.handleClick}>View Details</Button></TableCell>
        <TableCell ><Button align="right" type="submit" variant="contained" color="primary" 
        onClick={this.handleClick}>Edit</Button></TableCell>
      </TableRow>
      </MuiThemeProvider>
		);
  }
}

EventRow.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const reduxMap = reduxState => {
    return reduxState;
}

export default withRouter (withStyles(withStyles)(connect(reduxMap)(EventRow)));