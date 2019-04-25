import React, { Component } from "react";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';




const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: 8,
        marginRight: 8,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4,
    },
    card: {
        // maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

class EventView extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_EVENTS' })
    };

    handleRunEvent = eventId => () => {
        console.log('runevent clicked', eventId);
        this.props.dispatch({ type: 'EVENT_TO_RUN', payload: eventId})
    }


    render() {
        console.log('this.props.eventReducer:', this.props.events);
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={8}>
                    {this.props.events.map((eventItem) => {
                        return (
                            <Grid item xs={12} md={3} sm={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        image="images/bloom-blooming-caffeine-768943.jpg"
                                        title="Contemplative Reptile"
                                        style={{ boxShadow: '0 2px 2px #efefef'}}
                                />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {eventItem.event_name}
                                        </Typography>
                                        <Typography component="p">
                                            {eventItem.description}
                                        </Typography>
                                        <Typography gutterBottom component="p" style={{ fontSize: '13px', marginBottom: '0' }}>
                                            {eventItem.event_date}
                                        </Typography>
                                        <Typography gutterBottom component="p" style={{ fontSize: '13px', marginBottom: '0' }}>
                                            {eventItem.location}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="h6" style={{ fontSize: '15px', marginBottom: '0', marginTop: '8px' }}>
                                            Event Organizer
                                                </Typography>
                                        <Typography gutterBottom component="p" style={{ fontSize: '13px', marginBottom: '0' }}>
                                            {eventItem.contact_name}
                                        </Typography>
                                        <Typography gutterBottom component="p" style={{ fontSize: '13px' }}>
                                            {eventItem.contact_email} / {eventItem.contact_phone}
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Edit Event
                                        </Button>
                                        <Button size="small" color="primary" onClick={this.handleRunEvent(eventItem.id)}>
                                            Run Event
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    }
                    )}
                </Grid>
            </div>
        );
    }
}

const reduxMap = reduxState => {
    return reduxState;
}

export default withStyles(styles)(connect(reduxMap)(EventView));