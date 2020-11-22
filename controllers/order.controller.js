const ApiError = require("../helpers/ApiError");
const HttpStatus = require("http-status-codes");

module.exports = {
  async createOrder(req) {
    try {
      const {
        bis_schedule_id,
        passengers,
        user_id,
        email_order,
        phone_number,
      } = req.body;

      

    } catch (err) {
      console.log("error createOrder : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
