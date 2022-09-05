//* SERVER IMPORT
const express = require("express");
const server = express();

//* ENV IMPORT
const { config } = require("dotenv");
config();

//* OTHER IMPORTS
const path = require("path");
const sessions = require("express-session");
const connectFlash = require("connect-flash");

//* SESSION STORE
const mongoDbSessionStore = require("connect-mongodb-session");
const MongoDbStore = mongoDbSessionStore(sessions);
const sessionsStore = new MongoDbStore({
  databaseName: process.env.DATABASE_NAME,
  collection: "sessions",
  uri: process.env.MONGO_URI,
});

const appRoutes = require("./routes/app-routes");
const commonOptionsToViewProvider = require("./middleware/commonOptionsToViewProvider");
const { connectMongoDb } = require("./database/mongo-db");
const authenticatedUserProvider = require("./middleware/authenticatedUserProvider");

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use(express.static(path.join(__dirname, "public")));
server.use(
  sessions({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: Date.now() + 86400000,
    },
    store: sessionsStore,
  })
);
//* connectFlash() creates a new cookie in session as soon as the first request hit the server.
server.use(connectFlash());
server.use(authenticatedUserProvider);
server.use(commonOptionsToViewProvider);
server.use(appRoutes);

const connectMongoDbFailure = () => {
  console.log("Unable to connect database.");
};

const connectMongoDbSuccess = () => {
  server.listen(process.env.PORT, (err) => {
    if (err) {
      return console.log(
        `Error occurred while starting the port ${process.env.PORT}`
      );
    }
    return console.log(`Server started at port ${process.env.PORT}`);
  });
};

connectMongoDb().then(connectMongoDbSuccess).catch(connectMongoDbFailure);
