const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const port = 8009;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'https://sign-in-form-rho.vercel.app' }));
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
