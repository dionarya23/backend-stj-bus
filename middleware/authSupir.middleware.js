const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
      if (!req.header("Authorization")) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          status: HttpStatus.UNAUTHORIZED,
          message: "unauthorized",
        });
      }
  
      if (req.header("Authorization")) {
        const decoded = jwt.verify(
          req.header("Authorization").replace("Bearer ", ""),
          process.env.JWTSECRET
        );
  
        if (decoded.user.user_type !== "driver" && decoded.user.user_type !== "admin") {
          return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: "just driver and admin can access this endpoint",
          });
        } else {
          next();
        }
      }
    } catch (err) {
      console.log("error auth middleware : ", err);
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        message: "invalid token",
      });
    }
  };