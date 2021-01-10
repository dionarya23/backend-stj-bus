const HttpStatus = require("http-status-codes");
const ApiError = require("../helpers/ApiError");

const sukuCadangRepository = require("../repositories/suku_cadang.repository");
const bengkelRepository = require("../repositories/bengkel.repository");
const stockBengkelRepository = require("../repositories/stockBengkel.repository");

module.exports = {
  async createStock(req) {
    try {
      const { id_bengkel, id_suku_cadang, total_suku_cadang } = req.body;

      const bengkel = await bengkelRepository.getOneBengkel(id_bengkel);
      const sukuCadang = await sukuCadangRepository.getById(id_suku_cadang);
      const stockBengkel = await stockBengkelRepository.getStockBySukuCadangandBengkel(
        { id_suku_cadang, id_bengkel }
      );

      if (!stockBengkel) {
        if (bengkel === null || sukuCadang === null) {
          return {
            status: HttpStatus.NOT_FOUND,
            message:
              bengkel === null ? `bengkel not found` : `suku cadang not found`,
          };
        } else {
          if (total_suku_cadang <= sukuCadang.total_suku_cadang) {
            await sukuCadangRepository.updateData(sukuCadang.id_suku_cadang, {
              total_suku_cadang:
                sukuCadang.total_suku_cadang - total_suku_cadang,
            });

            await stockBengkelRepository.createNewStock({
              id_bengkel,
              id_suku_cadang,
              total_suku_cadang,
            });

            return {
              status: HttpStatus.CREATED,
              message: "success create stock bengkel",
            };
          } else {
            return {
              status: HttpStatus.getStatusCode("Bad Request"),
              message: "total suku cadang yang dimasukan melebihi stock",
            };
          }
        }
      } else {
        return {
          status: HttpStatus.CONFLICT,
          message:
            "suku cadang and bengkel already exist, do with put/update endpoint",
        };
      }
    } catch (err) {
      console.log("error at createStock, stockBengkelController : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async updateStockSukuCadang(req) {
    try {
      const { id_stock_bengkel } = req.params;
      const { total_suku_cadang } = req.body;

      const stockBengkel = await stockBengkelRepository.getStockSukuCadangById(id_stock_bengkel);
      if (!stockBengkel) {
        return {
          status: HttpStatus.NOT_FOUND,
          message : "stock bengkel not found"
        }
      }

      const sukuCadang = await sukuCadangRepository.getById(stockBengkel.id_suku_cadang)

      if (total_suku_cadang <= sukuCadang.total_suku_cadang) {
        await sukuCadangRepository.updateData(sukuCadang.id_suku_cadang, {
          total_suku_cadang:
            sukuCadang.total_suku_cadang - total_suku_cadang,
        });

        await stockBengkelRepository.updateStockBengkel({id_stock_bengkel, total_suku_cadang})     

        return {
          status: HttpStatus.OK,
          message: "success update stock bengkel",
        };
        
      } else {
        return {
          status: HttpStatus.getStatusCode("Bad Request"),
          message: "total suku cadang yang dimasukan melebihi stock gudang pusat",
        };
      }

    } catch (err) {
      console.log(
        "error at updateStockSukuCadang stockBengkelController : ",
        err
      );
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
