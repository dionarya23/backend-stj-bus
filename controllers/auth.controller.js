const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");

const emailSender = require("../config/nodemailer");
const verifikasiTemplate = require("../helpers/verifikasi.template_mail");
const generateNumber = require("../helpers/generateNumberForVerifEmail");
const ApiError = require("../helpers/ApiError");
const { isEmail } = require("validator");
const userRepository = require("../repositories/user.repository");

module.exports = {
  async login(req) {
    try {
      const { email, password } = req.body;
      const user = await UserRepository.findUserByEmail(email);

      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          if (user.code_verif === null) {
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
            return {
              status: HttpStatus.BAD_REQUEST,
              message: "Your account must verify",
            };
          }
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
      console.log("Login error ", error);
      throw new ApiError(
        "Internal Server Error.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async register(req) {
    try {
      const {
        email,
        password,
        firstname,
        lastname,
        phone_number,
        user_type,
      } = req.body;
      const user = await UserRepository.findUserByEmail(email);
      const user_ = await UserRepository.findUserByEmail(phone_number);

      if (user) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: "Email already taken",
        };
      }

      if (user_) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: "Phone Number already taken",
        };
      }

      if (!isEmail(email)) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: "Email incorrect format",
        };
      }

      const newPassword = bcrypt.hashSync(password, 10);
      let userToDb = {
        firstname,
        lastname,
        email,
        password: newPassword,
        phone_number,
        user_type,
        code_verif: generateNumber,
      };

      await UserRepository.createUser(userToDb);

      let message = {
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Verifikasi Akun Sudiro Tunggal Jaya Anda",
        html: verifikasiTemplate({
          name: firstname,
          number: userToDb.code_verif,
        }),
      };

      emailSender.sendMail(message, function (err, info) {
        if (err) {
          console.log("send email : ", err);
          return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Send email error",
          };
        }
        console.log("Success send email ", info);
      });

      return {
        status: HttpStatus.CREATED,
        message: "Success Register",
      };
    } catch (error) {
      console.log("register prosess : ", error);
      throw new ApiError(
        "Internal Server Error.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async checkEmail(req) {
    const { email } = req.body;

    if (!isEmail(email)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Email incorrect format",
      };
    }

    const user = await UserRepository.findUserByEmail(email);
    return {
      status: user ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: user ? "Email exist" : "Email not found",
    };
  },

  async resendCodeVerif(req) {
    const { email } = req.body;

    if (!isEmail(email)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Email incorrect format",
      };
    }

    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: "Email not found",
      };
    }

    let message = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Verifikasi Akun Sudiro Tunggal Jaya Anda",
      html: verifikasiTemplate({
        name: firstname,
        number: userToDb.code_verif,
      }),
    };

    emailSender.sendMail(message, function (err, info) {
      if (err) {
        console.log("send email : ", err);
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Send email error",
        };
      }
      console.log("Success send email ", info);
    });

    return {
      status: HttpStatus.OK,
      message: "Success Send Code Verif to your email",
    };
  },

  async verifAccount(req) {
    const { code_verif, email } = req.body;
    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: "Email not found",
      };
    }

    if (user.code_verif != code_verif) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Code verif wrong",
      };
    } else {
      await userRepository.updateUserByEmail(email, { code_verif: null });

      return {
        status: HttpStatus.OK,
        message: "Success verif account",
      };
    }
  },
};
