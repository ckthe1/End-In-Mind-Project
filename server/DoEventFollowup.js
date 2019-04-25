const mailGun = require('./MailGun');
const pool = require('./modules/pool');

module.exports = event => {

    console.log('Sending a follow up to ', event.event_name);
    if (event.contact_email) {

      // send the email with mailgun
      mailGun({
        from: 'End In Mind <me@samples.mailgun.org>',
        to: event.contact_email,
        subject: 'Event followup, ' + event.event_name,
        text: `Hello! We hope your event ${event.event_name} with End In Mind went well.
        Please help us out by filling out a short follow-up form. http://localhost:3000/#/event/followup?event=${event.id}`,
      });

      // Now we need to mark the follow up as complete so it doesn't send
      // another followup on the next update tick.
      pool.query(`UPDATE "events" 
      SET "follow_up_complete" = true
      WHERE "id" = $1;`, [event.id]);
      

    }else {
      console.log('contact email is null or invalid', event.event_name);
    }
}