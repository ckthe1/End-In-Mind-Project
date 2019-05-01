import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SelectCommunity from "../SelectCommunity/SelectCommunity";


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: 8,
    marginRight: 8,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 10,
  },
  textField: {
    marginTop: 4,
    marginBottom: 10,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: 0,
    width: 120,
    float: 'left',
  },
  icon: {
    fontSize: 40,
    verticalAlign: -8,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  typography: {
    useNextVariants: true,
  },
  container: {
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

});

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    community:'',
  };

  registerUser = (event) => {
    event.preventDefault();


    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          community: this.state.community,
        },
      });
      console.log('register payload:',this.payload);
      
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  


  onCommunitySelection = selection => {
    console.log('selected community ', selection)
    this.setState({
      community: selection,
    });
  }

  render() {

    const { classes } = this.props;

    return (
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(212, 212, 212, 0.1), rgba(138, 138, 138, 0.1)), url(images/bloom-blooming-caffeine-768943.jpg)`
        }}
        className="bckgrnd-container"
      >
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <div className={classes.root}>
          <div className={classes.container}>
            <Paper
              className={classes.root}
              elevation={1}
              style={{ marginTop: "40px" }}
            >
              <Typography>
                <h2
                  style={{
                    marginBottom: "10px",
                    fontSize: "35px",
                    color: "#4534e5"
                  }}
                >
                  Register
                </h2>
              </Typography>
              <ValidatorForm
                ref="form"
                onSubmit={this.registerUser}
                onError={errors => console.log(errors)}
              >

                <SelectCommunity  onSelect={this.onCommunitySelection}/>

                <Grid container spacing={8}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      id="username"
                      label="Username"
                      fullWidth
                      className={classNames(classes.textField)}
                      onChange={this.handleInputChangeFor("username")}
                      name="eventTitle"
                      type="text"
                      margin="normal"
                      autoComplete="off"
                      value={this.state.username}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                      variant="outlined"
                      style={{marginTop: "15px"}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      id="standard-password-input"
                      label="Password"
                      className={classes.textField}
                      type="password"
                      margin="normal"
                      variant="outlined"
                      autoComplete="off"
                      value={this.state.password}
                      onChange={this.handleInputChangeFor("password")}
                      fullWidth
                    />
                    <TextField
                      id="standard-email-input"
                      label="E-Mail"
                      className={classes.textField}
                      type="email"
                      margin="normal"
                      variant="outlined"
                      autoComplete="off"
                      value={this.state.email}
                      onChange={this.handleInputChangeFor("email")}
                      fullWidth
                    />
                  </Grid>
                

                  
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  style={{ marginTop: "10px" }}
                >
                  Register
                </Button>
                <Button
                  type="button"
                  // variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  style={{ marginTop: "10px", float: "right" }}
                  onClick={() => {
                    this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
                  }}
                >
                  Back
                </Button>
              </ValidatorForm>
            </Paper>
          </div>
        </div>

        {/* Old Form */}
        {/* <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="Email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        </center> */}
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));

