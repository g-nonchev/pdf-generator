module.exports = ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ msg: 'Please log in to access this resource' });
  };
  