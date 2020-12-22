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
};
