const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  if(req.headers.token){
    const token = req.headers.token;
    jwt.verify(token, process.env.SECRECT_KEY, (err, user) => {
      if (err) res.status(403).json({error: {message: "Token is not valid!"}});
      req.user = user;
      next();
    })
  }else{
    return res.status(401).json({error: {message: "You are not authenticated!"}});
  }
};

const authorization = (req, res, next) => {
  
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({error: {message: "You are not alowed to do that!"}});
    }
  });
};
  
const admin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({error: {message: "You are not alowed to do that!"}});
    }
  });
};

module.exports = {
  verifyToken,
  authorization,
  admin,
};