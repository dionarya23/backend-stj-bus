const HttpStatus = require("http-status-codes");
const ApiError = require("../helpers/ApiError");
const scheduleRepository = require("../repositories/schedule.repository");

module.exports = {
  async searchSchedule(req) {
    try {
      let { departure, destination, date_departure, type_bis } = req.query;

      type_bis = type_bis.split(",");
      const bisSchedule = await scheduleRepository.searchSchedule({
        departure,
        destination,
        date_departure,
        type_bis,
      });

      return {
        status: HttpStatus.OK,
        message: "success get schedule",
        data: bisSchedule,
      };
    } catch (err) {
      console.log("searchSchedule : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
