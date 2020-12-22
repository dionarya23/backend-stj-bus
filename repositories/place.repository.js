const Place = require("../services/table").Place


module.exports = {
    async getPlaceList() {
        try {
            const placeses = await Place.findAll();
            return placeses;
        }catch(err) {
            console.log("error in searchSchedule repository : ", Err);
            throw "Something error";
        }
    },

    async createPlace(dataPlace) {
        try {
            await PlaceModel.create(dataPlace)
        }catch(err) {
            console.log("error in searchSchedule repository : ", Err);
            throw "Something error";
        } 
    }
}