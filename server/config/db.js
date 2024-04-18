const mongoose = require("mongoose");

const db ="mongodb+srv://kamalbanjade:K%40M%40L@cluster0.sf0urdt.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0";

// Remove the useNewUrlParser option
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
