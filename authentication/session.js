const addLogoutToReq = (req) => {
  req.logout = function (res, next) {
    this.session.destroy((err) => {
      if (err) return next(err);
      res.send({ message: 'Logout successfully' });
    });
  };
};

const addCreateSessionToReq = (req, res, next) => {
  req.createSession = function (userId) {
    this.session.regenerate((err) => {
      if (err) throw err;
      this.session.userId = userId;
    });
  };
  next();
};

function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    addLogoutToReq(req);
    return next();
  }
  const err = new Error('Please login first');
  err.statusCode = 404;
  next(err);
}

module.exports = {
  isAuthenticated,
  addCreateSessionToReq,
};
