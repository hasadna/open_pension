import path from 'path';
const Graceful = require('@ladjs/graceful');
const Bree = require('bree');

const bree = new Bree({
  jobs: [
    // runs `./jobs/process-files` on the last day of the month.
    {
      name: 'process-files',
      path: path.resolve(__dirname, 'lib', 'queue.js'),
      cron: '* * * * *'
    },
  ]
});

// Handle graceful reloads, pm2 support, and events like SIGHUP, SIGINT, etc.
const graceful = new Graceful({ brees: [bree] });
graceful.listen();

// Start all jobs (this is the equivalent of reloading a crontab):
bree.start();
