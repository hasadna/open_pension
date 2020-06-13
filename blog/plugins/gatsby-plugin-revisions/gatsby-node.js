const fs = require('fs');
const path = require('path');
const ncp = require("ncp");
const { execSync } = require("child_process");

exports.onCreateDevServer = ({ app }) => {
  const revisionsPath = path.join(process.cwd(), 'revisions');
  const publicPath = path.join(process.cwd(), 'public');

  app.get('/revisions', function(req, res) {
    // Return the list of directories, i.e: revisions.
    const directories = fs.readdirSync(revisionsPath);
    res.send(directories);
  })

  app.post('/revision-revert/:revision', function(req, res) {
    const revision = req.params.revision;
    ncp(path.join(revisionsPath, revision), publicPath);

    res.status(200).send({message: `The revision ${revision} has been reverted.`});
  })

  app.post('/revision', function (req, res) {
    // First, we need to build our current timestamp.
    execSync('gatsby build');

    if (!fs.existsSync(publicPath)) {
      // The public path does not exists, maybe gatsby could not build the site, so we'll return an error.s
      res.status(400).send({message: 'An error occurred while creating the revision. Look at the logs.'});
      return;
    }

    if (!fs.existsSync(revisionsPath)) {
      // The revision folder does not exists.
      fs.mkdirSync(revisionsPath);
    }

    // No limit, because why not?
    ncp.limit = 0;

    const revisionTimeStamp = Date.now();
    const futureRevisionFolder = `${revisionsPath}/${revisionTimeStamp}`;
    ncp(publicPath, futureRevisionFolder);

    res.send({message: 'Revision has created', revisionId: revisionTimeStamp})
  })
}
