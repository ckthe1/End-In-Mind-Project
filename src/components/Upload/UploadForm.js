import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";
import { Typography } from "@material-ui/core";
import Input from "@material-ui/core/Input";

const styles = theme => ({
  textField: {
    marginTop: 2,
    marginBottom: 2
  },
  menu: {
    width: 200
  },
  button: {
    margin: 0,
    width: 120,
    float: "right"
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  typography: {
    useNextVariants: true
  }
});

class FileDisplay extends Component {
  state = {
    title: "",
    description: "",
    file: null,
    fileName: "",
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch({
      type: "ADD_FILE",
      payload: this.state
    });
    this.setState({
      title: "",
      description: ""
    });
  };

  buttonEnable = () => {
    if (!this.state.fileName) {
      return <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled
          // className={classes.button}
        >
          Submit
        </Button>
      } else {
        return <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          // className={classes.button}
        >
          Submit
        </Button>
      }
    }
    

  handleFileUpload = event => {
    console.log(event.target.files[0].name)
    this.setState({
      file: event.target.files,
      fileName: event.target.files[0].name
    });

  };

  handleChangeFor = property => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const file = this.props.myFile;

    console.log("my file url", this.state.fileName);

    return (
      <div>
        {/* <div>
        <td> {this.props.myFile.title} </td>
        <td>{this.props.myFile.description}</td>
        <td>
          <a href={this.state.signedUrl} download={this.state.signedUrl}>
            <img src={this.state.signedUrl}></img>
          </a>
        </td>
        <td>
          <button onClick={this.deleteButton}>Delete</button>
        </td>
      </div> */}
        <Typography>
          <h2>Upload File</h2>
        </Typography>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <Grid container spacing={8}>
            <Grid item xs={12} sm={3}>
              <TextValidator
                id="title"
                label="Title"
                fullWidth
                className={classNames(classes.textField)}
                onChange={this.handleChangeFor("title")}
                name="title"
                type="text"
                margin="normal"
                value={this.state.title}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextValidator
                id="description"
                label="Description"
                fullWidth
                className={classNames(classes.textField)}
                onChange={this.handleChangeFor("description")}
                name="description"
                type="text"
                margin="normal"
                value={this.state.description}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={8} sm={3}>
              <Button variant="contained" component="label" color="primary">
                Upload File
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={this.handleFileUpload}
                />
              </Button>
            </Grid>
            <Grid item xs={8} sm={3}>
              {this.buttonEnable()}
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => {
  return reduxState;
};

export default withStyles(styles)(connect(mapReduxStateToProps)(FileDisplay));


   