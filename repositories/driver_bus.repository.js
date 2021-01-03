const { DriverBus } = require("../services/table");


module.exports = {
    async insertDriverBus(driverBusData) {
        try {
            await DriverBus.create(driverBusData)
        }catch(err) {
            console.log("error insertDriverBus : ", err);
            throw "Error insertDriverBus";
        }
    },

    async uploadPhotoDriver({photo_driver, driver_bus_id}) {
        try {
            await DriverBus.update({photo_driver}, {
                where: {
                    driver_bus_id
                }
            })
        }catch(err) {
            console.log("error uploadPhotoDriver : ", err);
            throw "error uploadPhotoDriver";
        }
    }   
}