import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {connect} from 'react-redux';

// import Nav from '../Nav/Nav';
import NavNew from '../Nav/NavNew';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import Upload from '../Upload/Upload';
import CalendarLanding from '../CalendarLanding/CalendarLanding';
import AdminSelect from '../AdminSelect/AdminSelect'

import Dashboard from '../Dashboard/Dashboard';
import EventView from '../EventView/EventView';

import './App.css';
import Calendar from '../Calendar/Calendar';
import EventCreateForm from '../EventCreateForm/EventCreateForm';
import EventSignUpForm from '../EventSignUpForm/EventSignUpForm';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33ab9f',
      main: '#4534e5',
      dark: '#4534e5',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
      'PostGrotesk-Book',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: '13',
    useNextVariants: true,
  },
});

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
        <div>
          <NavNew />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/event/create"
              component={EventCreateForm}
            />
              <ProtectedRoute
                exact
                path="/event/signup"
                component={EventSignUpForm}
              />
            <ProtectedRoute
              exact
              path="/dashboard"
              component={Dashboard}
            />
            <ProtectedRoute
              exact
              path="/calendar"
              component={CalendarLanding}
            />

              <ProtectedRoute
              exact
              path="/files"
              component={Upload}
            />
              <ProtectedRoute
              exact
              path="/adminselect"
              component={AdminSelect}
            />
            <ProtectedRoute
              exact
              path="/event/view"
              component={EventView}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
        </MuiThemeProvider>
      </Router>
  )}
}

export default connect()(App);
