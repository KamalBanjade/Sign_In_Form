const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require('cors');
const cookiParser = require("cookie-parser")
const port = 8009;

app.use(express.json());
app.use(cookiParser());
app.use(cors({ origin: 'https://sign-in-form-76b7uudni-kamalbanjades-projects.vercel.app/' }));
app.use(router);

app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})