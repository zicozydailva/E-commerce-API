require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000;
const connectDB = require("./db/connect")
const morgan = require("morgan")

app.use(express.json())

const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

const authRouter = require("./routes/authRoutes")

app.use("/api/v1/auth", authRouter)

// MIDDLEWARE
app.use(morgan("tiny"))
// Morgan middleware helps you track routes: appears on the console

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

function start() {
  try {
    connectDB(process.env.MONGO_URI)
    app.listen(process.env.PORT || port, () =>
      console.log(`Server is running on port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}
start();
