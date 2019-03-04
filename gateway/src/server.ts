import app from "./app";
import Settings from "./Base/Settings";

app.listen(Settings.get().PORT, () => {
    console.log("Express server listening on port " + Settings.get().PORT);
});

process.on("SIGINT", async () => {
    console.log("Disconnecting");
    process.exit();
});
