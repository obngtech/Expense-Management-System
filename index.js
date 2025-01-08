require("dotenv").config();
const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./Middlewares/globalErrorHandler");
const router = require("./Routes");
const connectDb = require("./Config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(router);

app.use(globalErrorHandler);

app.listen(PORT, async () => {
  await connectDb();
  console.log(`App is listening on port ${PORT}`);
});
