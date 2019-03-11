import nodemon from "nodemon";


if (process.env.ENV !== "prodcution") {
    nodemon()
}
