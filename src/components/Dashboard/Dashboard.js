import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EventRow from "../EventRow/EventRow";
import Dialog from "@material-ui/core/Dialog";
import EventCard from "../EventCard/EventCard";
import PrintIcon from '@material-ui/icons/Print';
import Button from '@material-ui/core/Button';
import './Dashboard.css';

const styles = theme => ({
  root: {
    width: '96%',
    marginTop: theme.spacing.unit * 3,
    margin: '12px auto',
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
});


class Dashboard extends Component {

  state = {
    // When viewing details of an event, its info will be here
    fullEvent: null,
  }

  handlePrint = () => {
    console.log('print this');
    window.print();
  }//end print, print this page

  handleClose = () => {

    // Clear the event after the panel has time to fade out
    setTimeout(() => {
      this.props.dispatch({type: 'CLEAR_EVENT'});
    }, 500);
    
    this.setState({ fullEvent: null});
  };

  componentDidMount() {
    this.props.dispatch({ type: "FETCH_EVENTS" });
  }

  // Called when the 'view details' button is clicked for an event.
  onViewDetails = event => {

    this.props.dispatch({type: 'SET_EVENT', payload: event});

    console.log('viewing details for event ', event);
    this.setState({
      fullEvent: event
    });

  }

  // TODO dialog with event details

  render() {
    const { classes } = this.props;

    return (
      <div>
        <p className="dashboardPrintClass"><Button variant="contained" color="primary" onClick={this.handlePrint} >
          Print <PrintIcon /></Button></p>
      <Paper className={classes.root}>
        <Table className={classes.table}>

          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Community</TableCell>
              <TableCell>Attendees</TableCell>
              <TableCell>View details</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              this.props.events.map(row => 
                <EventRow row={row} key={row.event_id} eventSelected={this.onViewDetails}/>
              )
            }
          </TableBody>
          
        </Table>
      </Paper>
      <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={this.state.fullEvent != null}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <EventCard showAll={true}/>
      </Dialog>

      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const reduxMap = reduxState => {
  return reduxState;
};

export default withStyles(styles)(connect(reduxMap)(Dashboard));
