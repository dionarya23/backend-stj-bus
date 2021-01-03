const { Passengers } = require("../services/table")
const { QueryTypes  } = require("sequelize");

const sequelize = require("../config/database")
module.exports = {
    async createPassengers(passengers) {
        try {
            await Passengers.bulkCreate(passengers)
        }catch(err) {
            console.log("error createPassengers : ", err)
            throw "error createPassengers"
        }
    },

    async getListSeat({schedule_bis_id, date_departure}) {
        try {

            let rawQuery = `
            SELECT passengers.seat_passenger FROM passengers 
            inner join orders on passengers.order_id = orders.order_id
            inner join schedule_bis on orders.schedule_bis_id = schedule_bis.schedule_bis_id
            where schedule_bis.schedule_bis_id = ${schedule_bis_id}
            and CONCAT(extract( YEAR from orders.createdAt), '-',extract( MONTH from orders.createdAt),'-', extract( DAY from orders.createdAt)) = '${date_departure}'
            `;

            const listSeat = await sequelize.query(rawQuery, {type: QueryTypes.SELECT})
            return listSeat
        }catch(err) {
            console.log("error getListSeat : ", err)
            throw "error getListSeat"
        }
    }
}