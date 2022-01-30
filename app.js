require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const port = 5000;
const connectDB = require("./db/connect")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET_KEY))
app.use(express.static("./public"))
app.use(fileUpload())

const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes")
const reviewRouter = require("./routes/reviewRoutes")

app.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.send("E-commerce api")
})


// MIDDLEWARE
app.use(morgan("tiny"))
// Morgan middleware helps you track routes: appears on the console

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/reviews", reviewRouter)

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