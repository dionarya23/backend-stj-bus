const { Passengers } = require("../services/table")

module.exports = {
    async createPassengers(passengers) {
        try {
            await Passengers.bulkCreate(passengers)
        }catch(err) {
            console.log("error createPassengers : ", err)
            throw "something error"
        }
    }
}