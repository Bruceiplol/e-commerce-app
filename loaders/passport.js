const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Auth = require("../controllers/authController");
const AuthInstance = new Auth();

const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await AuthInstance.login({ username, password });

        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  return passport;
};
