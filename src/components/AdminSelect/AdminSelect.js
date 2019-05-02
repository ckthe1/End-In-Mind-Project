import React, { Component } from "react";
import './AdminSelect.css'
import { connect } from 'react-redux';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AdminSelectRow from "./AdminSelectRow";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: '96%',
    maxWidth: '1400px',
    marginTop: theme.spacing.unit * 3,
    margin: '12px auto',
    overflowX: 'auto',
  },
});


class AdminSelect extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USERS' })
  }

  userIsSuperAdmin = () => {

    if (!this.props.user) return false;
    return this.props.user.is_super_admin;
  }

  userIsAdmin = () => {
    if (!this.props.user) return false;
    return this.props.user.is_super_admin || this.props.user.is_community_admin;
  }

  render() {

    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Full Name</TableCell>

              {this.userIsSuperAdmin() && 
                <TableCell>Super Admin</TableCell>
              }

              {(this.userIsSuperAdmin() || this.userIsAdmin())&& 
                <TableCell>Community Admin</TableCell>
              }

              { this.userIsAdmin() && 
                <TableCell>Community</TableCell>
              }

              <TableCell>Approved</TableCell>
              { this.userIsAdmin() && 
                <TableCell>Delete</TableCell>
              }

            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.users.map( user => 
              <AdminSelectRow 
                key={user.id} 
                user={user} 
                isAdmin={this.userIsAdmin} 
                isSuperAdmin={this.userIsSuperAdmin}/>
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => state;

export default withStyles(styles)(connect(mapStateToProps)(AdminSelect));