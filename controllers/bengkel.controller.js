const HttpStatus = require("http-status-codes");
const ApiError = require("../helpers/ApiError");

const bengkelRepository = require("../repositories/bengkel.repository");

module.exports = {
  async getAll() {
    try {
      const list_bengkel = await bengkelRepository.getAllBengkel();

      return {
        status: HttpStatus.OK,
        message: "success",
        data: list_bengkel,
      };
    } catch (err) {
      console.log("Error at getAll bengkel controller : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async getBengkelById(req) {
    try {
      const { id_bengkel } = req.params;
      const bengkel = await bengkelRepository.getOneBengkel(id_bengkel);

      return {
        status: HttpStatus.OK,
        message: "success",
        data: bengkel,
      };
    } catch (err) {
      console.log("Error at getBengkeById bengkel controller : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async insertBengkel(req) {
    try {
      const bengkel = await bengkelRepository.getBengkelByUserId(
        req.body.user_id
      );
      if (bengkel) {
        return {
          status: HttpStatus.CONFLICT,
          message: "user_id already taken by another bengkel",
        };
      }

      await bengkelRepository.insertDataBengkel(req.body);

      return {
        status: HttpStatus.CREATED,
        message: "success",
      };
    } catch (err) {
      console.log("Error at insertBengkel bengkel controller : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async updateBengkel(req) {
    try {
      const { id_bengkel } = req.params;
      if (typeof req.body.user_id !== undefined) {
        const bengkel = await bengkelRepository.getBengkelByUserId(
          req.body.user_id
        );
        if (bengkel.id_bengkel != id_bengkel) {
          return {
            status: HttpStatus.CONFLICT,
            message: "user_id already taken by another bengkel",
          };
        }
      }

      await bengkelRepository.updateBengkelData(id_bengkel, req.body);
      return {
        status: HttpStatus.OK,
        message: "success",
      };
    } catch (err) {
      console.log("Error at updateBengkel bengkel controller : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async deleteBengkel(req) {
    try {
      const { id_bengkel } = req.params;
      await bengkelRepository.deleteBengkelData(id_bengkel);
      return {
        status: HttpStatus.OK,
        message: "success",
      };
    } catch (err) {
      console.log("Error at deleteBengkel bengkel controller : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
