const { DriverBus } = require("../services/table");


module.exports = {
    async insertDriverBus(driverBusData) {
        try {
            await DriverBus.create(driverBusData)
        }catch(err) {
            console.log("error insertDriverBus : ", err);
            throw "Something Error";
        }
    }
}