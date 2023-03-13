const express = require("express");
const connectDB = require("./backend/config/db");
require("dotenv").config();
require("colors");
const { errorHandler } = require("./backend/middleware/errorMiddleware");

const port = process.env.port || 5000;
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./backend/Routes/userRoute"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
