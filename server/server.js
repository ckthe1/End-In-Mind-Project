
const express = require('express');
require('dotenv').config();

// Import cron so we can check every day if we need to send emails
var CronJob = require('cron').CronJob;

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const eventsRouter = require('./routes/events.router');
const awsRouter = require('./routes/aws.router')

const getCompletedEvents = require('./GetCompleteEvents');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/events', eventsRouter);
app.use('/api/aws', awsRouter)


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

new CronJob('*/10 * * * * *', checkEventEmails, null, true, 'America/Los_Angeles');

async function checkEventEmails() {

  try {
    const response = await getCompletedEvents();
    console.log('events:', response);
  }
  catch (error) {
    console.log('error getting completed events', error);
  }

  console.log('Hi im checking emails and its', Date.now() );
}