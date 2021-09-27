module.exports = {
  apps: [
    {name: "queue", script: "./build/main/job.js"},
    {name: "server", script: "./build/main/index.js"},
  ]
}
