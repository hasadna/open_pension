import app from "./app";

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
app.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});

process.on("SIGINT", async () => {
    console.log("Disconnecting");
    process.exit();
});
