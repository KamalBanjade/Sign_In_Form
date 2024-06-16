const mongoose = require("mongoose");

const DB = "mongodb+srv://kamalbanjade:K%40M%40L@cluster0.sf0urdt.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB,{
    // useUnifiedTopology: true
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})