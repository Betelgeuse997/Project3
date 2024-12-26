import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import userAuth from "./routes/userAuth.js";
// import cors from "cors";
import path from "path";

const app = express();

app.use(express.json());
// app.use(cors({
//     origin: 'http://localhost:5050',
//     methods: ['GET', 'PUT', 'POST', 'DELETE'],
//     allowedHeaders:['Content-Type']
// }));

app.use('/',userAuth);

app.get('/*', function(req, res){
    // console.log(path.join(path.dirname(""), "loginPage.html"));
    res.sendFile(`E:/Vishnu/Development_Project_MERN/Project_3/loginPage.html`), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    }
});


mongoose.connect(mongoDBURL)
.then(() => {
    console.log("App connected to mongoose database - Project_3.Learn")
    app.listen(PORT, () => {
        console.log(`Listening to port: ${PORT}`);
    });
})
.catch((err) => {console.log("Database connection error",err)});