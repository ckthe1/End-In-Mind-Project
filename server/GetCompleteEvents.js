const pool = require('./modules/pool');

module.exports = getCompletedEvents = async (req) => {

    try {

        // Get all the events that ended more than 2 days ago and haven't had an
        // follow up email sent yet.
        const queryText = `SELECT * FROM "events" 
        WHERE ("end_time" + '2 days')  < now() AND 
        "follow_up_complete" is not true;`;

        const result = await pool.query(queryText);
        return result.rows;
    }
    catch (error) {
        console.log(error);
        return "error";
    }
}