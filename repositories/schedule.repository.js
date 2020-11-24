const {
  ScheduleBis,
  Bis,
  Orders,
  Passengers,
  Place,
} = require("../services/table");
const { Op, fn, col } = require("sequelize");

module.exports = {
  async searchSchedule(params) {
    try {
      var whereCondition = {
        destination_id: {
          [Op.eq]: params.destination_id,
        },
        departure_id: {
          [Op.eq]: params.departure_id,
        },
        date_departure: {
          [Op.eq]: params.date_departure,
        },
      };

      if (params.new_hour_departure.length != 0) {
        let hour_departure_condition = {
          [Op.or]: [],
        };

        params.new_hour_departure.map((e) => {
          hour_departure_condition[Op.or].push({
            [Op.between]: e,
          });
        });

        whereCondition.hour_departure = hour_departure_condition;
      }

      if (params.new_hour_arrived.length != 0) {
        let hour_arrived_condition = {
          [Op.or]: [],
        };

        params.new_hour_arrived.map((e) => {
          hour_arrived_condition[Op.or].push({
            [Op.between]: e,
          });
        });

        whereCondition.hour_arrived = hour_arrived_condition;
      }

      const bis_schedule = await ScheduleBis.findAll({
        attributes: [
          "schedule_bis_id",
          "bis_id",
          "date_departure",
          [fn("date_format", col("hour_departure"), "%H:%i"), "hour_departure"],
          [fn("date_format", col("hour_arrived"), "%H:%i"), "hour_arrived"],
          "price",
          "total_passenger",
        ],
        where: whereCondition,
        include: [
          {
            model: Place,
            as: "destination",
            attributes: ["place_id", "city_name", "place_name"],
          },
          {
            model: Place,
            as: "departure",
            attributes: ["place_id", "city_name", "place_name"],
          },
          {
            model: Bis,
            as: "bis",
            where: {
              type_bis: {
                [Op.in]: params.type_bis,
              },
            },
            attributes: ["type_bis", "plat_nomor"],
          },
          {
            model: Orders,
            as: "schedule_order",
            attributes: ["order_id", "paid"],
            required: false,
            include: [
              {
                model: Passengers,
                as: "people_order",
                attributes: [
                  "passenger_name",
                  "passenger_age",
                  "seat_passenger",
                ],
              },
            ],
          },
        ],
      });

      return bis_schedule;
    } catch (Err) {
      console.log("error in searchSchedule repository : ", Err);
      throw "Something error";
    }
  },
};
