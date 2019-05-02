import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import classNames from "classnames";

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

    // Prevent the page from reloading
    event.preventDefault();

    // Dispatch an action to begin the upload saga
    this.props.dispatch({
      type: "ADD_FILE",
      payload: this.state
    });

    // Clear the local state
    this.setState({
      title: "",
      description: "",
      file: null,
      fileName: "",
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

    return (
      <div>
      
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
                Browse...
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={this.handleFileUpload}
                />
              </Button>
              <p>{this.state.fileName}</p>
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