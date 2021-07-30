const mongoose = require("mongoose");
const {
  ENV,
  DB_HOST,
  DB_ADMIN_USERNAME,
  DB_ADMIN_PASSWORD,
} = require("../config");

const dbPath =
  ENV === "dev"
    ? `mongodb://${process.env.DB_HOST}:27017/urussu`
    : `mongodb://${DB_ADMIN_USERNAME}:${DB_ADMIN_PASSWORD}@${DB_HOST}:27017/urussu?authSource=admin`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbPath, options, (err) => {
  if (err) {
    console.error(`Unable to connect ${dbPath}`);
    throw err;
  }

  console.log(`DB connection has been established with ${dbPath}`);
});

let db = mongoose.connection;

db.on("error", (err) => {
  console.error("A db error occurred", err.message);
  throw Error(err);
});

module.exports = db;
