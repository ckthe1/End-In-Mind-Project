import { combineReducers } from "redux";
import errors from "./errorsReducer";
import loginMode from "./loginModeReducer";
import user from "./userReducer";
import events from "./Events.reducer";
import tableEvents from './EventsTable.reducer';
import calendarEvents from './EventsCalendar.reducer';
import selectedEvent from "./SelectedEvent.reducer";
import contacts from "./Contacts.reducer";
import eventDialog from "./EventDialog.reducer";
import AWS from './awsFilesReducer';
import users from './usersReducer';
import editEvent from './editEventReducer';
import attendees from './attendeeReducer';
import communities from './Communities.reducer';



// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, 				// contains registrationMessage and loginMessage
  loginMode, 			// will have a value of 'login' or 'registration' to control which screen is shown
  user, 				// will have an id and username if someone is logged in
  events,				// List of all the events on the calendar
  selectedEvent,		// The event we're viewing details of 
  contacts,     // Main contacts of a selected community
  eventDialog,    // Is there an event dialog open?
  AWS,
  users,       //gets all users from db
  editEvent,        // to edit info from dashboard
  attendees, // List of all attendees who signed-up at an event
  users,       //gets all users from db
  communities,  
  // tableEvents,    // event data formatted for the dashboard table
  // calendarEvents, // event data formatted for the calendar

});

export default rootReducer;
