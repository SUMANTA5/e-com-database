import express from "express";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
const app = express();
import routes from "./routes";
import mongoose from 'mongoose';


// Database connection
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected...');
});


app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);
app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}`);
});
