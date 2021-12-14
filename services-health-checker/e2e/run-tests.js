const ngrok = require('ngrok');
const {writeFileSync} = require('fs');
const {join} = require('path');
const { spawn } = require("child_process");

(async function() {

  const [backend, front] = await Promise.all([
    ngrok.connect({authtoken: '22EemEoKm8N5d4qYLbHunNbUqHm_6Pko7dcuwP6Dzw3z59jqh', addr: 1000}),
    ngrok.connect({authtoken: '22EemEoKm8N5d4qYLbHunNbUqHm_6Pko7dcuwP6Dzw3z59jqh', addr: 3000})
  ]);

  const configFilePath = join(process.cwd(), 'e2e', 'config.js');

  writeFileSync(configFilePath,  `exports.config = { 
    beforeTest: function (test) {
      test.config.baseUrl = '${backend}'; 
      return ${JSON.stringify({backend, front})} 
    } 
  }`);
  const ls = spawn(`testim`,  [
    `-c`, './e2e/config.js',
    "--token", process.env.TESTIM_TOKEN,
    "--project", process.env.TESTIM_PROJECT,
    "--grid", "Testim-Grid",
    "--chrome-binary-location",  "/usr/bin/google-chrome"
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
})();
