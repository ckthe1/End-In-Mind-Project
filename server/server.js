
const express = require('express');
require('dotenv').config();

// Import cron so we can check every day if we need to send emails
var CronJob = require('cron').CronJob;

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const filesRouter = require("./routes/files.router");
const userRouter = require('./routes/user.router');
const eventsRouter = require('./routes/events.router');
const awsRouter = require('./routes/aws.router');
const attendeeRouter = require('./routes/attendee.router');
const communityRouter = require('./routes/community.router');

const getCompletedEvents = require('./GetCompleteEvents');
const doEventFollowup = require('./DoEventFollowup');

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
app.use("/api/files", filesRouter);
app.use("/api/attendee", attendeeRouter);
app.use('/api/community', communityRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// This cronJob will execute checkEventEmails every hour on the hour.
new CronJob('0 * * * *', checkEventEmails, null, true, 'America/Los_Angeles');

/**
 * Finds the events that need a followup email, and sends them an email.
 */
async function checkEventEmails() {

  try {
    const response = await getCompletedEvents();

    // For each of these events, we need to send the follow up email, and then
    // mark them as 'follow up sent'
    for (let event of response) {
      doEventFollowup(event);
    }
  }
  catch (error) {
    console.log('error getting completed events', error);
  }
}