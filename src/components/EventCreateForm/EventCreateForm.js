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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames';
import FormLabel from '@material-ui/core/FormLabel';
import EventIcon from '@material-ui/icons/Event';
import TimeIcon from '@material-ui/icons/AccessTime';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import { getTime } from 'date-fns/esm';


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
        marginBottom: 10,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: 0,
        marginTop: 10,
        width: 120,
        float: 'right',
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
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
    },

});

const audienceDropdown = ['0-10', '10-20', '20-30', '50-100', '100-200', '200+'];

class EventCreateForm extends Component {

    state = {
        eventId: !this.props.selectedEvent.id ? '' : this.props.selectedEvent.id,
        eventHeading: !this.props.selectedEvent.id ? 'Create New Event' : 'Edit Event',
        // authorUserId: this.props.user.id,
        // communityId: this.props.user.community_id,
        eventTitle: !this.props.selectedEvent.id ? '' : this.props.selectedEvent.event_name,
        description: !this.props.selectedEvent.id ? '' : this.props.selectedEvent.description,
        selectedDate: !this.props.selectedEvent.id ? new Date() : this.props.selectedEvent.start_time,
        start_time: !this.props.selectedEvent.id ? new Date() : this.props.selectedEvent.start_time,
        end_time: !this.props.selectedEvent.id ? new Date() : this.props.selectedEvent.end_time,
        location: !this.props.selectedEvent.id ? '' : this.props.selectedEvent.location,
        contactName: !this.props.selectedEvent.id ? '' : this.props.selectedEvent.contact_name,
        contactEmail: !this.props.selectedEvent.id ? '' : this.props.selectedEvent.contact_email,
        contactPhone: !this.props.selectedEvent.id ? '' : this.props.selectedEvent.contact_phone,
        audienceSize: !this.props.selectedEvent.id ? '' : this.props.selectedEvent.expected_attendees,
        eventTypeArray: '',
        eventTypes: {
            popUpPodcast: false,
            endInMindClub: false,
            deathOverDinner: false,
            honoringTraining: false,
            stevieRay: false,
            deathCafe: false,
            livingWills: false,
            tedTalks: false,
            writingParty: false,
            healthStory: false,
        },
    }

    componentDidMount = () => {
        // this.props.dispatch({ type: 'CLEAR_EVENT' });
        console.log('this.props.editEvent ID:', this.props.editEvent);
       if(this.props.editEvent){
           console.log('editEvent ID exist in IF Statement:', this.props.editEvent);
        //    this.props.dispatch({ type: 'GET_EDIT_INFO', payload: this.props.row.id });
       }
    }

    componentWillUnmount = () => {
        this.props.dispatch({ type: 'CLEAR_EVENT' })
    }



    // handles on inputs on form and sets state
    handleChange = (property) => (event) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        });
    }

    getEventTypes = () => {
        let eventTypes = [];

        console.log('event types:', this.state.eventTypes);

        Object.entries(this.state.eventTypes).forEach(entry => {
            if (entry[1]) eventTypes.push(entry[0]);
        });
        this.setState({
            eventTypeArray: [...this.state.eventTypeArray, eventTypes]
        })
    }

    // handles form submit button, sends post dispatch to redux with payload of all selected form inputs + clears form 
    handleSubmit = () => {
        this.getEventTypes();
        !this.props.selectedEvent.id ? this.props.dispatch({ type: 'ADD_EVENT', payload: this.state }) : this.props.dispatch({ type: 'EDIT_EVENT', payload: this.state });
        this.setState({
            eventId: '',
            eventTitle: '',
            description: '',
            selectedDate: new Date(),
            start_time: new Date(),
            end_time: new Date(),
            location: '',
            contactName: '',
            contactEmail: '',
            contactPhone: '',
            audienceSize: '',
            eventTypeArray: '',
            eventTypes: {
                popUpPodcast: false,
                endInMindClub: false,
                deathOverDinner: false,
                honoringTraining: false,
                stevieRay: false,
                deathCafe: false,
                livingWills: false,
                tedTalks: false,
                writingParty: false,
                healthStory: false,
            },
        });

        !this.props.selectedEvent.id ? alert('Your event has been created!') : alert('Your event has been edited!');
        this.props.history.push('/event/view');
    }

    // handles date/time selection for date, starttime, endtime
    handleDateChange = propName => event => {
        
        this.setState({
            ...this.state,
            [propName]: event,
        });
    };
    

    handleEventTypeChange = name => event => {
        this.setState({
            eventTypes: {
                ...this.state.eventTypes,
                [name]: event.target.checked
            }
        });
    };

    handleCancelEdit = () => {
        this.props.dispatch({ type: 'CLEAR_EVENT' });
        this.setState({
            eventTitle: '',
            description: '',
            selectedDate: new Date(),
            start_time: new Date(),
            end_time: new Date(),
            location: '',
            contactName: '',
            contactEmail: '',
            contactPhone: '',
            audienceSize: '',
            eventTypeArray: '',
            eventTypes: {
                popUpPodcast: false,
                endInMindClub: false,
                deathOverDinner: false,
                honoringTraining: false,
                stevieRay: false,
                deathCafe: false,
                livingWills: false,
                tedTalks: false,
                writingParty: false,
                healthStory: false,
            },
        });
        this.props.history.push('/event/view');
    }

    // handleCancelEdit = () => {
    //     if(this.props.selectedEvent.id) {
    //         return <Grid item xs={8} sm={10}>
    //             <Button
    //                 type="submit"
    //                 onClick={this.handleCancelEdit}
    //                 variant="contained"
    //                 color="primary"
    //                 size="large"
    //                 float="left"
    //                 className={classes.button}>
    //                 Cancel
    //                 </Button>
    //         </Grid>

    //     }
    // }


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


    render() {
        const { classes } = this.props;
        // console.log(this.state.eventTypeArray);
        // console.log('user id', this.props.user.community_id);
        console.log('selected event id', this.props.selectedEvent)
        

        return (
            <div style={{ backgroundImage: `linear-gradient(rgba(212, 212, 212, 0.1), rgba(138, 138, 138, 0.1)), url(images/bloom-blooming-caffeine-768943.jpg)` }}
                className="bckgrnd-container">
                <div className={classes.root}>
                    <div className={classes.container}>
                        <Paper className={classes.root} elevation={1} style={{ marginTop: '40px' }}>
                            <Typography><h2 style={{ marginBottom: '10px', fontSize: '35px', color: '#4534e5' }}><EventIcon className={classes.icon} />
                            {this.state.eventHeading}</h2>
                            </Typography>
                            <ValidatorForm
                                ref="form"
                                onSubmit={this.handleSubmit}
                                onError={errors => console.log(errors)}
                            >
                                <Grid container spacing={8}>
                                    <Grid item xs={12} sm={4}>
                                        <TextValidator
                                            id="eventTitle"
                                            label="* Event Title"
                                            fullWidth
                                            className={classNames(classes.textField)}
                                            onChange={this.handleChange('eventTitle')}
                                            name="eventTitle"
                                            type="text"
                                            margin="normal"
                                            value={this.state.eventTitle}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextValidator
                                            id="description"
                                            label="Description"
                                            multiline
                                            fullWidth
                                            rowsMax="4"
                                            type="text"
                                            value={this.state.description}
                                            onChange={this.handleChange('description')}
                                            className={classes.textField}
                                            // validators={['required']}
                                            // errorMessages={['this field is required']}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} style={{ marginBottom: '8px' }}>
                                        <FormLabel component="legend" style={{ color: '#000', marginTop: '8px' }}>* Event Type</FormLabel>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.eventTypes.popUpPodcast}
                                                    onChange={this.handleEventTypeChange('popUpPodcast')}
                                                    color="primary"
                                                    value="Pop-up Podcasts"
                                                />
                                            }
                                            label="Pop-up Podcasts"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.eventTypes.endInMindClub}
                                                    onChange={this.handleEventTypeChange('endInMindClub')}
                                                    color="primary"
                                                    value="End in Mind Book Club"
                                                />
                                            }
                                            label="End in Mind Book Club"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.eventTypes.deathOverDinner}
                                                    onChange={this.handleEventTypeChange('deathOverDinner')}
                                                    color="primary"
                                                    value="Death Over Dinner"
                                                />
                                            }
                                            label="Death Over Dinner"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.eventTypes.honoringTraining}
                                                    onChange={this.handleEventTypeChange('honoringTraining')}
                                                    color="primary"
                                                    value="Honoring Choices Training"
                                                />
                                            }
                                            label="Honoring Choices Training"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.eventTypes.stevieRay}
                                                    onChange={this.handleEventTypeChange('stevieRay')}
                                                    color="primary"
                                                    value="The Life and Death Comedy Show with Stevie Ray"
                                                />
                                            }
                                            label="The Life and Death Comedy Show with Stevie Ray"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.eventTypes.deathCafe}
                                                    onChange={this.handleEventTypeChange('deathCafe')}
                                                    color="primary"
                                                    value="Death Cafe"
                                                />
                                            }
                                            label="Death Cafe"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.eventTypes.livingWills}
                                                    onChange={this.handleEventTypeChange('livingWills')}
                                                    color="primary"
                                                    value="Living Wills Through Art"
                                                />
                                            }
                                            label="Living Wills Through Art"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.eventTypes.tedTalks}
                                                    onChange={this.handleEventTypeChange('tedTalks')}
                                                    color="primary"
                                                    value="Discuss TED Talks"
                                                />
                                            }
                                            label="Discuss TED Talks"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.eventTypes.writingParty}
                                                    onChange={this.handleEventTypeChange('writingParty')}
                                                    color="primary"
                                                    value="Legacy Letter Writing Party"
                                                />
                                            }
                                            label="Legacy Letter Writing Party"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.eventTypes.healthStory}
                                                    onChange={this.handleEventTypeChange('healthStory')}
                                                    color="primary"
                                                    value="Host a Health Story Collaborative"
                                                />
                                            }
                                            label="Host a Health Story Collaborative"
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                margin="normal"
                                                label="* Date"
                                                fullWidth
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
                                                className={classNames(classes.textField)}
                                                variant="outlined"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                            >
                                                                <EventIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={6} sm={4}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <TimePicker
                                                margin="normal"
                                                label="* Start Time"
                                                fullWidth
                                                value={this.state.start_time}
                                                onChange={this.handleDateChange('start_time')}
                                                className={classNames(classes.textField)}
                                                variant="outlined"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                            >
                                                                <TimeIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={6} sm={4}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <TimePicker
                                                margin="normal"
                                                label="* End Time"
                                                fullWidth
                                                value={this.state.end_time}
                                                onChange={this.handleDateChange('end_time')}
                                                className={classNames(classes.textField)}
                                                variant="outlined"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                            >
                                                                <TimeIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextValidator
                                            id="location"
                                            label="* Location"
                                            fullWidth
                                            className={classNames(classes.textField)}
                                            onChange={this.handleChange('location')}
                                            name="location"
                                            type="text"
                                            margin="normal"
                                            value={this.state.location}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextValidator
                                            id="audienceSize"
                                            select
                                            fullWidth
                                            label="Audience Size"
                                            className={classes.textField}
                                            value={this.state.audienceSize}
                                            onChange={this.handleChange('audienceSize')}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                            }}
                                            // validators={['required']}
                                            // errorMessages={['this field is required']}
                                            margin="normal"
                                            variant="outlined"
                                        >
                                            {audienceDropdown.map((option, i) => (
                                                <MenuItem key={i} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextValidator>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextValidator
                                            id="contactName"
                                            label="* Contact Full Name"
                                            multiline
                                            fullWidth
                                            rowsMax="4"
                                            type="text"
                                            value={this.state.contactName}
                                            onChange={this.handleChange('contactName')}
                                            className={classes.textField}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextValidator
                                            id="contactEmail"
                                            label="* Email"
                                            multiline
                                            fullWidth
                                            rowsMax="4"
                                            type="email"
                                            value={this.state.contactEmail}
                                            onChange={this.handleChange('contactEmail')}
                                            className={classes.textField}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextValidator
                                            id="contactPhoner"
                                            label="* Phone Number"
                                            multiline
                                            fullWidth
                                            rowsMax="4"
                                            type="text"
                                            value={this.state.contactPhone}
                                            onChange={this.handleChange('contactPhone')}
                                            className={classes.textField}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={2} >
                                        <h5 style={{ margin: '0', fontWeight: 'lighter', fontStyle: 'italic' }}>* required</h5>
                                    </Grid>
                                    <Grid container spacing={8} justify="flex-end">
                    
                                    <Grid item xs={5} sm={2}>
                                        <Button
                                            // type="submit"
                                            onClick={this.handleCancelEdit}
                                            // style={{float: 'left'}}
                                            variant="contained"
                                            fullWidth
                                            // color="secondary"
                                                // style={{ color: '#33ab9f' }}
                                            size="large"
                                            className={classes.button}>
                                        Cancel
                                        </Button>
                                        </Grid>
                             
                                    <Grid item xs={5} sm={2}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.button}>
                                            Submit
                                        </Button>
                                    </Grid>
                                    </Grid>
                                </Grid>
                            </ValidatorForm>
                        </Paper>
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


export default withStyles(styles)(connect(mapReduxStateToProps)(EventCreateForm));