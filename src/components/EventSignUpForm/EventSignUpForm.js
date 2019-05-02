import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Snackbar from '@material-ui/core/Snackbar';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import ErrorIcon from '@material-ui/icons/Error';
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from 'material-ui-pickers';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames';
import FormLabel from '@material-ui/core/FormLabel';
import EventIcon from '@material-ui/icons/Event';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import './EventSignUpForm.css';


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: 8,
        marginRight: 8,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4,
    },
    textField: {
        marginTop: 4,
        marginBottom: 15,
    },
    menu: {
        width: 400,
    },
    button: {
        margin: 0,
        height: 60,
        fontSize: 20,
    },
    icon: {
        fontSize: 50,
        verticalAlign: -8,
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    typography: {
        useNextVariants: true,
    },
    container: {
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

const genderDropdown = ['Female', 'Male', 'Prefer Not To Say'];
const ethnicityDropdown = ['Asian', 'Black/African American', 'Hispanic/Latino', 'Middle Eastern/North African', 'Native American/Alaskan Native', 'Native Hawaiian/Other Pacific Islander', 'White/Caucasian']
const incomeDropdown= ['Less than 20,000', '20,000 - 35,000', '35,000 - 50,000', '50,000 - 75,000', '75,000 - 100,000', '100,000 - 150,000', '150,000 - 200,000', '200,000 or more']

class EventSignUpForm extends Component {

    state = {
        authorUserId: this.props.user.id,
        communityId: this.props.user.community_id,
        firstName: '',
        lastName: '',
        contactPhone: '',
        contactEmail: '',
        birthDate: new Date(),
        income: '',
        gender: '',
        ethnicity: '',
        eventId: 1,
    }

    componentDidMount = () => {
        // this.props.dispatch({ type: 'FETCH_TAGS' });
    }



    // handles on inputs on form and sets state
    handleChange = (property) => (event) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        });
    }

    // handles form submit button, sends post dispatch to redux with payload of all selected form inputs + clears form 
    handleSubmit = () => {
        this.props.dispatch({ type: 'ADD_ATTENDEE', payload: this.state });
        this.setState({
            firstName: '',
            lastName: '',
            contactPhone: '',
            contactEmail: '',
            birthDate: new Date(),
            income: '',
            gender: '',
            ethnicity: '',
            eventId: 1,
        });
    }

    // handles date select from date-picker
    handleDateChange = date => {
        this.setState({
            birthDate: date
        });
    };

    // determines which message will display on snackbar depending if post to database was successful  
    // alertMessage = () => {
    //     const { classes } = this.props;
    //     if (this.props.confirmPost.status) {
    //         return <span id="message-id" style={{ display: 'flex', alignItems: 'center' }}>
    //             <CheckCircleIcon className={classes.icon} />Project Successfully Added!</span>
    //     }
    //     else {
    //         return <span id="message-id" style={{ display: 'flex', alignItems: 'center' }}>
    //             <ErrorIcon className={classes.icon} />Project add was unsuccessful</span>
    //     }
    // }

    // handles close from snackbar and sends reset dispatch to redux  
    // handleClose = () => {
    //     this.props.dispatch({ type: 'RESET_POST' })
    // };
    handleCancel = () => {
        this.props.history.push('/event/view')
    }

    render() {
        const { classes } = this.props;
        console.log('selected event', this.props.selectedEvent)
        return (
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(212, 212, 212, 0.1), rgba(138, 138, 138, 0.1)), url(images/bloom-blooming-caffeine-768943.jpg)`
            }}
            className="bckgrnd-container"
          >
            <div className={classes.root}>
              <div className={classes.container}>
                <Paper
                  className={classes.root}
                  elevation={1}
                  style={{ marginTop: "50px" }}
                >
                  <Typography>
                    <h2
                      style={{
                        fontSize: "32px",
                        color: "#4534e5",
                        textAlign: "center"
                      }}
                    >
                      <img
                        src="images/eim_icon.png"
                        alt="End In Mind logo"
                        style={{
                          height: "45px",
                          verticalAlign: "-4px",
                          marginRight: "10px"
                        }}
                      />
                      {this.props.selectedEvent.event_name}
                    </h2>
                  </Typography>
                  <Typography>
                    <h3
                      style={{
                        marginBottom: "28px",
                        fontSize: "25px",
                        textAlign: "center",
                        fontFamily: "Lato"
                      }}
                    >
                      Welcome!
                    </h3>
                  </Typography>
                  <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                  >
                    <Grid container spacing={16}>
                      <Grid item xs={12} sm={6}>
                        <TextValidator
                          id="firstName"
                          label="First Name"
                          multiline
                          fullWidth
                          rowsMax="4"
                          type="text"
                          value={this.state.firstName}
                          onChange={this.handleChange("firstName")}
                          className={classes.textField}
                          // validators={['required']}
                          // errorMessages={['this field is required']}
                          margin="normal"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextValidator
                          id="lastName"
                          label="Last Name"
                          multiline
                          fullWidth
                          rowsMax="4"
                          type="text"
                          value={this.state.lastName}
                          onChange={this.handleChange("lastName")}
                          className={classes.textField}
                          // validators={['required']}
                          // errorMessages={['this field is required']}
                          margin="normal"
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextValidator
                          id="contactEmail"
                          label="Email"
                          multiline
                          fullWidth
                          rowsMax="4"
                          type="email"
                          value={this.state.contactEmail}
                          onChange={this.handleChange("contactEmail")}
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextValidator
                          id="contactPhoner"
                          label="Phone"
                          multiline
                          fullWidth
                          rowsMax="4"
                          type="tel"
                          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          value={this.state.contactPhone}
                          onChange={this.handleChange("contactPhone")}
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            margin="normal"
                            label="Date of Birth"
                            fullWidth
                            value={this.state.birthDate}
                            onChange={this.handleDateChange}
                            className={classNames(classes.textField)}
                            variant="outlined"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton>
                                    <EventIcon />
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      {/* <Grid item xs={12} sm={6}>
                                        <TextValidator
                                            id="income"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                            label="Household Income"
                                            fullWidth
                                            className={classNames(classes.textField)}
                                            onChange={this.handleChange('income')}
                                            name="income"
                                            type="number"
                                            margin="normal"
                                            value={this.state.income}
                                            variant="outlined"
                                        />
                                    </Grid> */}
                      <Grid item xs={12} sm={6}>
                        <TextValidator
                          id="income"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            )
                          }}
                          select
                          fullWidth
                          label="Income"
                          className={classes.textField}
                          value={this.state.income}
                          onChange={this.handleChange("income")}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu
                            }
                          }}
                          margin="normal"
                          variant="outlined"
                        >
                          {incomeDropdown.map((option, i) => (
                            <MenuItem key={i} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextValidator>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextValidator
                          id="gender"
                          select
                          fullWidth
                          label="Gender"
                          className={classes.textField}
                          value={this.state.gender}
                          onChange={this.handleChange("gender")}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu
                            }
                          }}
                          margin="normal"
                          variant="outlined"
                        >
                          {genderDropdown.map((option, i) => (
                            <MenuItem key={i} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextValidator>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextValidator
                          id="ethnicity"
                          select
                          fullWidth
                          label="Ethnicity"
                          className={classes.textField}
                          value={this.state.ethnicity}
                          onChange={this.handleChange("ethnicity")}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu
                            }
                          }}
                          margin="normal"
                          variant="outlined"
                        >
                          {ethnicityDropdown.map((option, i) => (
                            <MenuItem key={i} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextValidator>
                      </Grid>

                      {/* <Grid item xs={4} sm={2} >
                                <h5 style={{ margin: '-20px', marginLeft: '8px', fontWeight: 'lighter', fontStyle: 'italic' }}>* required</h5>
                            </Grid>  */}
                      <Grid item xs={12} sm={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          className={classes.button}
                        >
                          Check In!
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Button
                          type="button"
                          // variant="contained"
                          // color="secondary"
                          fullWidth
                          className={classes.button}
                          onClick={this.handleCancel}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </ValidatorForm>
                </Paper>
                <p className="disclaimer">
                  <i>
                    Your participation in completing this form is
                    voluntary. To help protect confidentiality, all
                    personally identifying information will be stored
                    separately from any demographic information. All
                    data is stored in a password protected electronic
                    format. If you have any questions about this form,
                    please contact Jamie Bachaus, End in Mind Program
                    Manager at jbachaus@endinmindproject.org or call
                    612-440-6715. Thank you.
                  </i>
                </p>

                {/* <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.props.confirmPost.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={this.alertMessage()}
                />  */}
              </div>
            </div>
          </div>
        );
    }
}


const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default withStyles(styles)(connect(mapReduxStateToProps)(EventSignUpForm));