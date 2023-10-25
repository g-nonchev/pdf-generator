module.exports = ensureAuthenticated = (req, res, next) => {
  // console.log("Is authenticated?", req.isAuthenticated());
  // console.log(req.session);
  if(req.user!=null){
    return next();
  }

  if (req.isAuthenticated()) {
      return next();
  }
  res.status(401).json({ msg: 'Please log in to access this resource' });
};