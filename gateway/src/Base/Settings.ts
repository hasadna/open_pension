export default class Settings {

    public static get() {
        return require("dotenv").config({path: __dirname + "/./../../.env"}).parsed;
    }
}
