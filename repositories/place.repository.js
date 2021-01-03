const Place = require("../services/table").Place

module.exports = {
    async getPlaceList() {
        try {
            const placeses = await Place.findAll({
                attributes: [
                    "place_id",
                    "city_name",
                    "province",
                    "place_name"
                ]
            });
            return placeses;
        }catch(err) {
            console.log("error in searchSchedule repository : ", Err);
            throw "error getPlaceList";
        }
    },

    async createPlace(dataPlace) {
        try {
            await Place.create(dataPlace)
        }catch(err) {
            console.log("error in searchSchedule repository : ", err);
            throw "error createPlace";
        } 
    },

    async updatePlace(place_id, data) {
        try {

            await Place.update(data, {
                where: place_id
            })

        }catch(err) {
            console.log("error in updatePlace repository : ", err)
            throw "Error updatePlace"
        }
    }
}