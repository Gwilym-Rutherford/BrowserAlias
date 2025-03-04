import express from "express";

import { alias } from "./routes/Alias.js";

const app = express();
const PORT = 3000;

// Setup view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Setup forms
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", alias);

app.listen(PORT, ()=>{
    console.log("Listening on port: " +
    PORT + " (http://localhost:" + PORT + ")");
});