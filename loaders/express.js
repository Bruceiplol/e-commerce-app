const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const { SESSION_SECRET } = require("../config");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cors());

  app.set("trust proxy", 1);

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );
  return app;
};
