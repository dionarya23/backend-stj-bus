const HttpStatus = require("http-status-codes");
const ApiError = require("../helpers/ApiError");
const PlaceRepository = require("../repositories/place.repository");
module.exports = {
  async getListPlace() {
    try {
      const place = await PlaceRepository.getPlaceList();

      return {
        status: HttpStatus.OK,
        message: "success get list placeses",
        data: place,
      };
    } catch (err) {
      console.log("getListPlace : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async createPlace(req) {
    try {
      const { city_name, place_name, province } = req.body;

      await PlaceRepository.createPlace({ city_name, place_name, province });
      return {
        status: HttpStatus.CREATED,
        message: "success create new place",
      };
    } catch (err) {
      console.log("createPlace : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
