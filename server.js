import express from "express";
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path'

import { alias } from "./src/routes/Alias.js";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PATH = path.join(__dirname, 'src','views');

// Setup view engine
app.set("view engine", "ejs");
app.set("views", PATH);

// Setup static files
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Setup forms
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", alias);

app.listen(PORT, ()=>{
    console.log("Listening on port: " +
    PORT + " (http://localhost:" + PORT + ")");
});