import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json);

app.get('/', (request, response) => {
    console.log(request);
    response.status(235).send("Hello there!");
})


mongoose.connect(mongoDBURL)
.then(() => {
    console.log("App connected to mongoose database - Project_3.Learn")
    app.listen(PORT, () => {
        console.log(`Listening to port: ${PORT}`);
    });
})
.catch((err) => {console.log("Database connection error",err)});