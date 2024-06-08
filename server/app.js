const express = require('express');
const connectDB = require('./config/db');
const signinRoutes = require('./routes/api/SignIn'); 
const registerRoutes = require('./routes/api/Register'); 
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Connect Database
connectDB();

// Use the cors middleware with the origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// Use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the routes modules as middleware
app.use("/api/signin", signinRoutes);
app.use("/api/register", registerRoutes);

app.get("/", (req, res) => res.send("Hello world!"));

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
