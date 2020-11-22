const { Passenger } = require("../services/table")

module.exports = {
    async createPassengers(passengers) {
        try {
            await Passenger.bulkCreate(passengers)
        }catch(err) {
            console.log("error createPassengers : ", err)
            throw "something error"
        }
    }
}