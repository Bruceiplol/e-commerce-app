const ensureAuthentication = (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  } else {
    res.status(403).json({ msg: "You have not logged in." });
  }
}

module.exports = {ensureAuthentication}