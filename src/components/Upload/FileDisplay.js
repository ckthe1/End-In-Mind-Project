import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SingleFile from "./SingleFile";


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 14
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 8,
    overflowX: "auto"
  },
  iconHover: {
    "&:hover": {
      color: theme.palette.primary.main
    }
  }
});

class FileDisplay extends Component {

  componentDidMount() {
    this.props.dispatch({ type: "FETCH_FILES" });
  }

  // handleDeleteClick = () => {
  //   this.props.dispatch({
  //     type: "DELETE_FILE",
  //     payload: this.props.myFile.key
  //   });

  //   return;
  // };

  render() {

    const { classes } = this.props;

    return (

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Title</CustomTableCell>
              <CustomTableCell>Description</CustomTableCell>
              <CustomTableCell>Download</CustomTableCell>
              <CustomTableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.props.AWS.map((file, index) => (<SingleFile key={file.id} myFile={file}/>))
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapReduxStateToProps = reduxState => {
  return reduxState;
};

export default withStyles(styles)(connect(mapReduxStateToProps)(FileDisplay));
