const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/router");
<<<<<<< HEAD
const cors = require("cors");
const cookiParser = require("cookie-parser")
const port = 8009;
=======
const cors = require('cors');
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8009;
>>>>>>> 82e03c7b728f9a25f4a682a6427e435f603e22e4

app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
  origin: 'https://sign-in-form-rho.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));

app.use(router);

app.get('/test', (req, res) => {
    res.json({ message: 'Hello from backend' });
});

app.listen(port, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log(`Server started at port: ${port}`);
    }
});
