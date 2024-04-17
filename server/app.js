const express = require('express');
const connectDB = require('./config/db');
const signinRoutes = require('./routes/api/SignIn'); // Import the sign-in routes
const registerRoutes = require('./routes/api/Register'); // Import the register routes

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
connectDB();
// use the cors middleware with the
// origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the routes modules as middleware
app.use("/api/signin", signinRoutes);
app.use("/api/register", registerRoutes);

// Connect Database
// ...

app.get("/", (req, res) => res.send("Hello world!"));
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));