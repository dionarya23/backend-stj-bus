const HttpStatus = require("http-status-codes");
const ApiError = require("../helpers/ApiError");
const scheduleRepository = require("../repositories/schedule.repository");

module.exports = {
  async searchSchedule(req) {
    try {
      let {
        departure,
        destination,
        date_departure,
        type_bis,
        hour_departure,
        hour_arrived,
      } = req.query;

      var new_hour_departure = [];
      var new_hour_arrived = [];
      if (typeof hour_departure !== undefined) {
        hour_departure = hour_departure.split(",");
        hour_departure.map((e) => {
          new_hour_departure.push(e.split("-"));
        });
      }

      if (typeof hour_arrived !== undefined) {
        hour_arrived = hour_arrived.split(",");
        hour_arrived.map((e) => {
          new_hour_arrived.push(e.split("-"));
        });
      }

      type_bis = type_bis.split(",");
      const bisSchedule = await scheduleRepository.searchSchedule({
        departure,
        destination,
        date_departure,
        type_bis,
        new_hour_departure,
        new_hour_arrived,
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
