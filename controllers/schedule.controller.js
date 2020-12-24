const HttpStatus = require("http-status-codes");
const ApiError = require("../helpers/ApiError");
const scheduleRepository = require("../repositories/schedule.repository");

module.exports = {
  async searchSchedule(req) {
    try {
      let {
        departure_id,
        destination_id,
        date_departure,
        type_bis,
        // hour_departure,
        // hour_arrived,
      } = req.query;

      var new_hour_departure = [];
      var new_hour_arrived = [];


      // console.log("Hour Departure : ", typeof hour_departure == "undefined")
      // console.log("Hour Destination : ", typeof hour_destination)
      // console.log("Hour Destination : ", typeof type_bis)



      // if (typeof hour_departure != "undefined") {
      //   hour_departure = hour_departure.split(",");
      //   hour_departure.map((e) => {
      //     new_hour_departure.push(e.split("-"));
      //   });
      // }

      // if (typeof hour_arrived != "undefined") {
      //   hour_arrived = hour_arrived.split(",");
      //   hour_arrived.map((e) => {
      //     new_hour_arrived.push(e.split("-"));
      //   });
      // }

      if (typeof type_bis != "undefined") {
        type_bis = type_bis.split(",")

        if (type_bis.length == 3) {
          type_bis = `('${type_bis[0]}', '${type_bis[1]}', '${type_bis[2]}')`
        }else if(type_bis.length == 2) {
          type_bis = `('${type_bis[0]}', '${type_bis[1]}')`
        }else if (type_bis.length == 1) {
          type_bis = `('${type_bis[0]}')`
        }
      }

      const bisSchedule = await scheduleRepository.searchSchedule({
        departure_id,
        destination_id,
        date_departure,
        type_bis,
        // new_hour_departure,
        // new_hour_arrived,
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
