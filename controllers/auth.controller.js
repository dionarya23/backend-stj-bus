const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");

const emailSender = require("../config/nodemailer");
const verifikasiTemplate = require("../helpers/verifikasi.template_mail");
const resetPasswordTemplate = require("../helpers/resetPassword.template");
const generateNumber = require("../helpers/generateNumberForVerifEmail");
const ApiError = require("../helpers/ApiError");
const { isEmail } = require("validator");
const userRepository = require("../repositories/user.repository");
const md5 = require("md5");

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
          return {
            status: HttpStatus.BAD_REQUEST,
            message: "something wrong, check email and password",
          };
        }
      } else {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: "something wrong, check email and password",
        };
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
    try {
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
      const newCode = generateNumber;
      await userRepository.updateUser({ email }, { code_verif: newCode });

      let message = {
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Verifikasi Akun Sudiro Tunggal Jaya Anda",
        html: verifikasiTemplate({
          name: user.firstname,
          number: newCode,
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
    } catch (error) {
      console.log("resend code prosess : ", error);
      throw new ApiError(
        "Internal Server Error.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async verifAccount(req) {
    try {
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
        await userRepository.updateUser({ email }, { code_verif: null });

        return {
          status: HttpStatus.OK,
          message: "Success verif account",
        };
      }
    } catch (error) {
      console.log("verifAccount : ", error);
      throw new ApiError(
        "Internal Server Error.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async resetPassword(req) {
    try {
      const { email } = req.body;
      const user = await UserRepository.findUserByEmail(email);

      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "email not found",
        };
      } else {
        const token = md5(email);
        await userRepository.updateUser(
          { email },
          { token_forgotPassword: token }
        );

        let message = {
          from: process.env.MAIL_FROM,
          to: user.email,
          subject: "Reset Password Akun Sudiro Tunggal Jaya Anda",
          html: resetPasswordTemplate({
            name: user.firstname,
            link: `${process.env.BASEURL_RESET_PASSWORD}${token}`,
          }),
        };

        emailSender.sendMail(message, (err, info) => {
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
          message: "Success send email, check your email",
        };
      }
    } catch (error) {
      console.log("reset password prosess : ", error);
      throw new ApiError(
        "Internal Server Error.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async changePassword(req) {
    try {
      let { token_forgotPassword, new_password } = req.body;
      const user = userRepository.findUser({ token_forgotPassword });

      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "Token not found or expirated",
        };
      }

      let password = bcrypt.hashSync(new_password, 10);

      await userRepository.updateUser(
        { token_forgotPassword },
        { password, token_forgotPassword: null }
      );
      return {
        status: HttpStatus.OK,
        message: "Success update password",
      };
    } catch (error) {
      console.log("changePassword prosess : ", error);
      throw new ApiError(
        "Internal Server Error.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async authWithGoogle(req) {
    try {
      const { id_google } = req.body;

      //check if id_google exist
      const user = await userRepository.findUser({ id_google });

      if (user) {
        const token_jwt = jwt.sign({ user }, process.env.JWTSECRET, {});
        return {
          status: HttpStatus.OK,
          message: "Success sign in with google",
          data: {
            user,
            token: token_jwt,
          },
        };
      } else {
        await UserRepository.createUser(req.body);
        const user_ = await userRepository.findUser({ id_google });
        const token_jwt = jwt.sign({ user_ }, process.env.JWTSECRET, {});
        return {
          status: HttpStatus.CREATED,
          message: "Success Sign up with google",
          data: {
            user_,
            token: token_jwt,
          },
        };
      }
    } catch (error) {
      console.log("authWithGoogle prosess : ", error);
      throw new ApiError(
        "Internal Server Error.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
