const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");

const ApiError = require("../helpers/ApiError");

module.exports = {
  async login(req) {
    try {
      const { email, password } = req.body;
      const user = await UserRepository.findUserByEmail(email);

      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({ user }, process.env.JWTSECRET, {});

          return {
            status: HttpStatus.OK,
            message: "Success Login",
            data: {
              user,
              token,
            },
          };
        } else {
          throw new ApiError(
            "something wrong, check email and password",
            HttpStatus.NOT_FOUND
          );
        }
      } else {
        throw new ApiError(
          "something wrong, check email and password",
          HttpStatus.NOT_FOUND
        );
      }
    } catch (error) {
      console.log("Login error ", error)
      throw new ApiError(
        "Internal Server Error.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async register(req) {
    try {
      const user = await UserRepository.findUserByEmail(req.body.email);
      const user = await UserRepository.findUserByEmail(email);

      if (user) {
        return {
          status  : HttpStatus.CONFLICT,
          message : "Email already taken" 
        }
      }

      req.body.password = bcrypt.hashSync(req.body.password, 10);
      await UserRepository.createUser(req.body);
      return {
        status: HttpStatus.CREATED,
        message: "Success Register",
      };
    } catch (error) {
      throw new ApiError(
        "Internal Server Error.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
