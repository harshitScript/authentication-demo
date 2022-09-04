const express = require("express");
const { config } = require("dotenv");

config();
const server = express();

server.use((req, res, next) => {
  return res.send({ message: "We are coming soon." });
});

server.listen(process.env.PORT, (err) => {
  if (err)
    return console.log(
      `Error occurred while starting the port ${process.env.PORT}`
    );

  return console.log(`Server started at port ${process.env.PORT}`);
});
