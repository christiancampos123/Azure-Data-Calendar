var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');

/* GET /calendar */
router.get('/', async function(req, res, next) {
  let parms = { title: 'Calendar', active: { calendar: true } };

  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {
    parms.user = userName;

    // Initialize Graph client
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });

    // Set base of the calendar view to today at midnight
    const base = new Date(new Date().setHours(0,0,0));
    // Set base of the calendar view to today at midnight
    const start = new Date(new Date(base).setDate(base.getDate() - 1));
    // Set end of the calendar view to 30 days from start
    const end = new Date(new Date(start).setDate(start.getDate() + 30));

    try {
      const result = await client
      //SalaReunionesPB
      //SalaReunionesPB@angel24.es
      //  /calendars/{calendar_id}
      // connect to calendar 2         .api(`/me/calendars/AQMkADI5ZDllZGViLTM0YWMtNDM0ZC1iMjFkLWQ0NWNmZgBhZDgwMTMARgAAA2JV_ZB8Tk1CigPGdWSwOioHAF-dcLHcaoRNsSJj5DytbrsAAAIBBgAAAF-dcLHcaoRNsSJj5DytbrsAAAI4KwAAAA==/calendarView?startDateTime=${start.toISOString()}&endDateTime=${end.toISOString()}`)

      .api(`/me/calendarView?startDateTime=${start.toISOString()}&endDateTime=${end.toISOString()}`)
      // Get the first 10 events for the coming month in range
      .top(10)
      .select('subject,start,end,attendees,createdDateTime')
      // Here will appear the data in asc order by the date.
      .orderby('start/dateTime ASC')
      .get();

      parms.events = result.value;
      res.render('calendar', parms);
    } catch (err) {
      parms.message = 'Error retrieving events';
      parms.error = { status: `${err.code}: ${err.message}` };
      parms.debug = JSON.stringify(err.body, null, 2);
      res.render('error', parms);
    }

  } else {
    // Redirect to home
    res.redirect('/');
  }
});

module.exports = router;