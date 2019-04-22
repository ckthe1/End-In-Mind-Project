import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EventRow from '../EventRow/EventRow';

class Dashboard extends Component {

    componentDidMount() {
        this.props.dispatch({type:'FETCH_EVENTS' });
    }

    render() {

            const { classes } = this.props;

        return (
            
                // <h2>DashBoard</h2>
                // <div>
                //     <p>Filters</p>
                //     <p>
                //         <button>Select Community</button><button>Select Event Type</button><button>Select Demographic</button>
                //         <button>Select Household Income</button><button>Download CSV</button><button>Print PDF</button>
                //     </p>
                   
                // </div>
           
            
            <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Community</TableCell>
                  <TableCell align="right">Event</TableCell>
                  <TableCell align="right">Attendees</TableCell>
                  <TableCell align="right">Expected Attendees</TableCell>
                  <TableCell align="right">Demographics</TableCell>
                  <TableCell align="right">Household Income</TableCell>
                  <TableCell align="right">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.events.map(row => (
                  <EventRow row={row} />
                ))}
              </TableBody>
            </Table>
          </Paper>
         
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const reduxMap = reduxState => {
    return reduxState;
}


export default withStyles(withStyles)(connect(reduxMap)(Dashboard));
