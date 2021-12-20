const ngrok = require('ngrok');
const {writeFileSync} = require('fs');
const {join} = require('path');
const {spawn} = require("child_process");

(async function () {
  try {
    const backend = await ngrok.connect({authtoken: process.env.NGROKTOKEN, addr: 1000});
    const front = await ngrok.connect({authtoken: process.env.NGROKTOKEN, addr: 3000});


    const configFilePath = join(process.cwd(), 'e2e', 'config.js');

    writeFileSync(configFilePath, `exports.config = { 
    beforeTest: function (test) {
      return ${JSON.stringify({backend, front})} 
    } 
  }`);
    const ls = spawn(`testim`, [
      `-c`, './e2e/config.js',
      "--token", process.env.TESTIM_TOKEN,
      "--project", process.env.TESTIM_PROJECT,
      "--base-url", "http://www.google.com",
      "--grid", "Testim-Grid",
      "--chrome-binary-location", "/usr/bin/google-chrome"
    ]);

    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
