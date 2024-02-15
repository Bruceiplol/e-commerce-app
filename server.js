const express = require("express");
const app = express();

module.exports = app;

const { PORT } = require("./config");

const loaders = require('./loaders')

async function startServer() {
  loaders(app)
  
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// const router = require('./routes/');
// app.use('/', router);

startServer();


