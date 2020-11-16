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
};
