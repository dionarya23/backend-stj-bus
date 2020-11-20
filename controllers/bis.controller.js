const ApiError = require("../helpers/ApiError");
const bisRepository = require("../repositories/bis.repositories");
const HttpStatus = require("http-status-codes");

module.exports = {
  
  async createNewBis(req) {
    try {
      await bisRepository.createBis(req.body);

      return {
        status: HttpStatus.CREATED,
        message: "success create bis",
      };
    } catch (err) {
      console.log("createNewBis error ", error);
      throw new ApiError(
        "Internal Server Error.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async updateBis(req) {
    try {
      const { id } = req.params;
      const bisUpdated = await bisRepository.updateBis(id, req.body);
      return {
        status: HttpStatus.OK,
        message: "success updated bis",
        data: bisUpdated,
      };
    } catch (err) {
      console.log("updateBis error : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },


};
