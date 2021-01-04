const { Passengers } = require("../services/table");
const { QueryTypes } = require("sequelize");

const sequelize = require("../config/database");
module.exports = {
  async createPassengers(passengers) {
    try {
      await Passengers.bulkCreate(passengers);
    } catch (err) {
      console.log("error createPassengers : ", err);
      throw "error createPassengers";
    }
  },

  async getListSeat({ schedule_bis_id, date_departure }) {
    try {
      let rawQuery = `
            SELECT passengers.seat_passenger FROM passengers 
            inner join orders on passengers.order_id = orders.order_id
            inner join schedule_bis on orders.schedule_bis_id = schedule_bis.schedule_bis_id
            where schedule_bis.schedule_bis_id = ${schedule_bis_id}
            and CONCAT(extract( YEAR from orders.createdAt), '-',extract( MONTH from orders.createdAt),'-', extract( DAY from orders.createdAt)) = '${date_departure}'
            `;

      const listSeat = await sequelize.query(rawQuery, {
        type: QueryTypes.SELECT,
      });
      return listSeat;
    } catch (err) {
      console.log("error getListSeat : ", err);
      throw "error getListSeat";
    }
  },

  async checkPassengerWithOrderId(order_id) {
    try {
      let queryBisDetail = `
      SELECT
      bis.seri as bis_seri,
      bis.type_bis as bis_type,
      schedule_bis.rute,
      schedule_bis.tgl_berangkat,
      p_dest.place_name as tempat_tujuan,
      p_dest.city_name as kota_tujuan,
      p_depart.city_name as kota_asal,
      p_depart.place_name as tempat_asal, 
      depart.jam as waktu_berangkat,
      dest.jam as waktu_tiba,
      orders.total_price as total_harga
      FROM orders
      inner join route_location depart on orders.id_departure=depart.route_location_id
      inner join route_location dest on orders.id_destination=dest.route_location_id
      inner join place p_depart on p_depart.place_id=depart.place_id
      inner join place p_dest on p_dest.place_id=dest.place_id
      inner join schedule_bis on schedule_bis.schedule_bis_id=orders.schedule_bis_id
      inner join bis on bis.bis_id=schedule_bis.bis_id
      where orders.order_id='${order_id}'
      `;

      const bisDetail = await sequelize.query(queryBisDetail, {
        type: QueryTypes.SELECT,
      });

      let queryPassenger = `
      select 
      passengers.passenger_name as nama_penumpang,
      passengers.passenger_age as umur_penumpang,
      passengers.seat_passenger as kursi_penumpang
      from passengers
      where passengers.order_id='${order_id}'
      `

      const passengerDetail = await sequelize.query(queryPassenger, {
          type: QueryTypes.SELECT
      })

      return {
        bisDetail,
        passengerDetail
      };

    } catch (err) {
      console.log("error checkPassengerWithOrderId : ", err);
      throw "error checkPassengerWithOrderId";
    }
  },
};
