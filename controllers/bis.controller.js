const ApiError = require("../helpers/ApiError");
const bisRepository = require("../repositories/bis.repositories");
const HttpStatus = require("http-status-codes");
const { getAllBis } = require("../repositories/bis.repositories");

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
      const { bis_id } = req.params;
      await bisRepository.updateBis(bis_id, req.body);
      return {
        status: HttpStatus.OK,
        message: "success updated bis",
      };
    } catch (err) {
      console.log("updateBis error : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async deleteBis(req) {
    try {
      const { bis_id } = req.params;

      await bisRepository.deleteBis(bis_id);

      return {
        status: HttpStatus.OK,
        message: "success delete bis with id " + bis_id,
      };
    } catch (err) {
      console.log("deleteBis : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async getOneBis(req) {
    try {
      const { bis_id } = req.params;

      const bis = await bisRepository.getBisById(bis_id);

      return {
        status: HttpStatus.OK,
        message: "success get bis by id " + bis_id,
        data: bis,
      };
    } catch (err) {
      console.log("getOneBis : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async getAllBis() {
    try {
      const bis = await bisRepository.getAllBis();

      return {
        status: HttpStatus.OK,
        message: "success get all bis",
        data: bis,
      };
    } catch (err) {
      console.log("getAllBis : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
