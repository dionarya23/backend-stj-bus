const { Users } = require("../services/table");

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

  async findUserbyPhoneNumber(phone_number) {
    try {
      const user = await Users.findOne({
        where: {
          phone_number,
        },
      });

      return user;
    } catch (e) {
      console.log("findUserbyPhoneNumber error : ", e);
      throw "Something error";
    }
  },
};
