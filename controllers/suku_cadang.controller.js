const HttpStatus = require("http-status-codes");

const ApiError = require("../helpers/ApiError");

const sukuCadaRepositories = require("../repositories/suku_cadang.repository");

module.exports = {
  async getAllSukuCadang() {
    try {
      const sukuCadang = await sukuCadaRepositories.getAll();
      return {
        status: HttpStatus.OK,
        message: "success",
        data: sukuCadang,
      };
    } catch (err) {
      console.log("error at getAllSukuCadang Controller : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async insertSukuCadang(req) {
    try {
      await sukuCadaRepositories.insertData(req.body);
      return {
        status: HttpStatus.CREATED,
        message: "success",
      };
    } catch (err) {
      console.log("error at insertSukuCadang Controller : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async updateSukuCadang(req) {
    try {
      const { id_suku_cadang } = req.params;
      const { nama_suku_cadang } = req.body;

      await sukuCadaRepositories.updateData(id_suku_cadang, nama_suku_cadang);
      return {
        status: HttpStatus.OK,
        message: "success",
      };
    } catch (err) {
      console.log("error at updateSukuCadang Controller : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async deleteSukuCadang(req) {
    try {
      const { id_suku_cadang } = req.params;

      await sukuCadaRepositories.deleteData(id_suku_cadang);
      return {
        status: HttpStatus.OK,
        message: "success",
      };
    } catch (err) {
      console.log("error at deleteSukuCadang Controller : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async getBySukuCadangById(req) {
    try {
      const { id_suku_cadang } = req.params;
      const suku_cadang = await sukuCadaRepositories.getById(id_suku_cadang);
      return {
        status: HttpStatus.OK,
        message: "success",
        data: suku_cadang,
      };
    } catch (err) {
      console.log("error at getBySukuCadangById constroller : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
