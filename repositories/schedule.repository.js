const {
  ScheduleBis,
  Bis,
  Orders,
  Passengers,
  Place,
} = require("../services/table");
const { Op, fn, col, QueryTypes  } = require("sequelize");

const sequelize = require("../config/database")

module.exports = {

  async searchSchedule({
    departure_id,
    destination_id,
    date_departure,
    type_bis,
    // new_hour_departure,
    // new_hour_arrived,
  }) {
    try {

      let rawQuery = `
      select 
      rd.rute, 
      rd.bis_id,
      bis.type_bis, 
      bis.seri, 
      bis.jumlah_kursi, 
      bis.harga_jatim, 
      bis.harga_jateng,
      (select city_name from place where place_id=${departure_id}) as kota_asal,
      (select place_name from place where place_id=${departure_id}) as kota_tujuan,
      (select city_name from place where place_id=${destination_id}) as tempat_asal,
      (select place_name from place where place_id=${destination_id}) as tempat_tujuan,
      bis.jumlah_kursi - (SELECT count(*) FROM passengers 
      inner join orders on passengers.order_id = orders.order_id
      inner join schedule_bis on orders.schedule_bis_id = schedule_bis.schedule_bis_id
      where schedule_bis.schedule_bis_id = rd.schedule_bis_id
      and CONCAT(extract( YEAR from orders.createdAt), '-',extract( MONTH from orders.createdAt),'-', extract( DAY from orders.createdAt)) = '${date_departure}') as sisa_kursi
      from place l 
      inner join route_location r on l.place_id = r.place_id 
      inner join schedule_bis rd on r.schedule_bis_id = rd.schedule_bis_id 
      inner join bis on rd.bis_id = bis.bis_id
      where l.place_id = ${departure_id} 
      or l.place_id =  ${destination_id}
     `;

      if (typeof type_bis != "undefined") {
        rawQuery += ` and bis.type_bis in ${type_bis}`
      }

      rawQuery += ` group by rd.rute, 
      r.schedule_bis_id having count(r.place_id)=2`

      const bis_schedule = await sequelize.query(rawQuery, {type: QueryTypes.SELECT})


      return bis_schedule

    }catch(err) {
      console.log("error in searchSchedule repository : ", err);
      throw "Something error";
    }
  }
  // async searchSchedule(params) {
  //   try {
  //     var whereCondition = {
  //       destination_id: {
  //         [Op.eq]: params.destination_id,
  //       },
  //       departure_id: {
  //         [Op.eq]: params.departure_id,
  //       },
  //       date_departure: {
  //         [Op.eq]: params.date_departure,
  //       },
  //     };

  //     if (params.new_hour_departure.length != 0) {
  //       let hour_departure_condition = {
  //         [Op.or]: [],
  //       };

  //       params.new_hour_departure.map((e) => {
  //         hour_departure_condition[Op.or].push({
  //           [Op.between]: e,
  //         });
  //       });

  //       whereCondition.hour_departure = hour_departure_condition;
  //     }

  //     if (params.new_hour_arrived.length != 0) {
  //       let hour_arrived_condition = {
  //         [Op.or]: [],
  //       };

  //       params.new_hour_arrived.map((e) => {
  //         hour_arrived_condition[Op.or].push({
  //           [Op.between]: e,
  //         });
  //       });

  //       whereCondition.hour_arrived = hour_arrived_condition;
  //     }

  //     const bis_schedule = await ScheduleBis.findAll({
  //       attributes: [
  //         "schedule_bis_id",
  //         "bis_id",
  //         "date_departure",
  //         [fn("date_format", col("hour_departure"), "%H:%i"), "hour_departure"],
  //         [fn("date_format", col("hour_arrived"), "%H:%i"), "hour_arrived"],
  //         "price",
  //         "total_passenger",
  //       ],
  //       where: whereCondition,
  //       include: [
  //         {
  //           model: Place,
  //           as: "destination",
  //           attributes: ["place_id", "city_name", "place_name"],
  //         },
  //         {
  //           model: Place,
  //           as: "departure",
  //           attributes: ["place_id", "city_name", "place_name"],
  //         },
  //         {
  //           model: Bis,
  //           as: "bis",
  //           where: {
  //             type_bis: {
  //               [Op.in]: params.type_bis,
  //             },
  //           },
  //           attributes: ["type_bis", "plat_nomor"],
  //         },
  //         {
  //           model: Orders,
  //           as: "schedule_order",
  //           attributes: ["order_id", "paid"],
  //           required: false,
  //           include: [
  //             {
  //               model: Passengers,
  //               as: "people_order",
  //               attributes: [
  //                 "passenger_name",
  //                 "passenger_age",
  //                 "seat_passenger",
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     });

  //     return bis_schedule;
  //   } catch (Err) {
  //     console.log("error in searchSchedule repository : ", Err);
  //     throw "Something error";
  //   }
  // },
};
