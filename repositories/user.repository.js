const { Users } = require("../services/table");
const { Or } = require("sequelize")

module.exports = {
  async findUserByEmail(email) {
    try {
      const user = await Users.findOne({
        where: {
          email,
        },
      });

      return user;
    } catch (e) {
      console.log("FindUserByEmail error : ", e);
      throw "Something error";
    }
  },

  async createUser(user) {
    try {
      await Users.create(user);
    } catch (e) {
      console.log("createUser error : ", e);
      throw "Something error";
    }
  },

  async findUserByPhoneNumber(emailAndPhoneNumber) {
    try {
      const user = await Users.findOne({
        where: {
          [Op.or]: [
            { email: emailAndPhoneNumber.email },
            { phone_number: emailAndPhoneNumber.phone_number },
          ],
        },
      });

      return user;
    } catch (e) {
      console.log("findEmailOrPhoneNumber error : ", e);
      throw "Something error";
    }
  },
};
