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
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_TABLE_EVENTS" });
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>

          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Community</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Attendees</TableCell>
              <TableCell>View details</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              this.props.tableEvents.map(row => 
                <EventRow row={row} key={row.event_id}/>
              )
            }
          </TableBody>
          
        </Table>
      </Paper>
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
