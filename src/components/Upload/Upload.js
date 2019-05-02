import React, { Component } from "react";
import { connect } from "react-redux";
import UploadForm from "./UploadForm";
import { withStyles } from "@material-ui/core/styles";
import FileDisplay from "./FileDisplay";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 40
  },
  container: {
    maxWidth: 700,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

class FileUpload extends Component {

  render() {

     const { classes } = this.props;

    return (
      <div>
        <div className={classes.root}>
        <div className={classes.container}>
        <UploadForm />
        <FileDisplay />
        </div>
      </div>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => {
  return reduxState;
};

export default withStyles(styles)(connect(mapReduxStateToProps)(FileUpload));


   