import path from 'path';
// optional
const Graceful = require('@ladjs/graceful');
// const Cabin = require('cabin');

// required
const Bree = require('bree');

//
// NOTE: see the "Instance Options" section below in this README
// for the complete list of options and their defaults
//
const bree = new Bree({
  //
  // NOTE: by default the `logger` is set to `console`
  // however we recommend you to use CabinJS as it
  // will automatically add application and worker metadata
  // to your log output, and also masks sensitive data for you
  // <https://cabinjs.com>
  //
  // logger: new Cabin({}),

  //
  // NOTE: instead of passing this Array as an option
  // you can create a `./jobs/index.js` file, exporting
  // this exact same array as `module.exports = [ ... ]`
  // doing so will allow you to keep your job configuration and the jobs
  // themselves all in the same folder and very organized
  //
  // See the "Job Options" section below in this README
  // for the complete list of job options and configurations
  //
  jobs: [
    // runs `./jobs/process-files` on the last day of the month
    {
      name: 'process-files',
      timeout: '1m',
      path: path.resolve(__dirname, 'lib', 'queue.js'),
      cron: '* * * * *'
    },
  ]
});

// handle graceful reloads, pm2 support, and events like SIGHUP, SIGINT, etc.
const graceful = new Graceful({ brees: [bree] });
graceful.listen();

// start all jobs (this is the equivalent of reloading a crontab):
bree.start();
