import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import niceDay from '../../niceBirthday';

const styles = theme => ({

  table: {
    minWidth: 500,
  },
});


class AttendeeTable extends Component {

  render() {
    const { classes } = this.props;

    return (
        <Table className={classes.table}>

          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Household Income</TableCell>
              <TableCell>Race/Ethnicity</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              this.props.attendees.map(guy => (
                <TableRow>
                  <TableCell>{guy.first_name} {guy.last_name}</TableCell>
                  <TableCell>{guy.email}</TableCell>
                  <TableCell>{guy.phone}</TableCell>
                  <TableCell>{niceDay(new Date(guy.dob))}</TableCell>
                  <TableCell>{guy.sex}</TableCell>
                  <TableCell>{guy.household_income}</TableCell>
                  <TableCell>{guy.race}</TableCell>
                </TableRow>
              )
              )
            }
          </TableBody>
          
        </Table>
    );
  }
}

AttendeeTable.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(connect()(AttendeeTable));
