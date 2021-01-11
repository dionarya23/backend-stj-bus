const HttpStatus = require("http-status-codes");
const ApiError = require("../helpers/ApiError");

const reportServiceRepository = require("../repositories/reportService.repository");
const sukuCadangRepository = require("../repositories/suku_cadang.repository");
const bengkelRepository = require("../repositories/bengkel.repository");
const bisRepository = require("../repositories/bis.repository");
const stockBengkelRepository = require("../repositories/stockBengkel.repository");

module.exports = {
  async createReport(req) {
    try {
      const {
        id_bengkel,
        id_suku_cadang,
        jumlah_terpakai,
        description,
        bis_id,
      } = req.body;

      const bis = await bisRepository.getBisById(bis_id);
      const sukuCadang = await sukuCadangRepository.getById(id_suku_cadang);
      const bengkel = await bengkelRepository.getOneBengkel(id_bengkel);
      const stockBengkel = await stockBengkelRepository.getStockBySukuCadangandBengkel(
        { id_suku_cadang, id_bengkel }
      );

      if (bis === null || sukuCadang === null || bengkel === null) {
        console.log("Bis : ", bis);
        console.log("sukuCadang : ", sukuCadang);
        console.log("stockBengkel : ", stockBengkel);
        return {
          status: HttpStatus.NOT_FOUND,
          message: `${
            bis === null
              ? "bis"
              : sukuCadang === null
              ? "suku cadang"
              : "bengkel"
          } not found`,
        };
      } else if (jumlah_terpakai > stockBengkel.total_suku_cadang) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message:
            "jumlah yang terpakai melebihi stock suku cadang pada bengkel ini",
        };
      }
      await stockBengkelRepository.updateStockBengkel({
        id_stock_bengkel: stockBengkel.id_stock_bengkel,
        stock_suku_cadang: stockBengkel.total_suku_cadang - jumlah_terpakai,
      });
      await reportServiceRepository.createReport({
        id_bengkel,
        id_suku_cadang,
        jumlah_yang_terpakai: jumlah_terpakai,
        description,
        id_bis: bis_id,
      });

      return {
        status: HttpStatus.CREATED,
        message: "success create new report",
      };
    } catch (err) {
      console.log("error at createReport at reportServiceController : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

//   async updateReport(req) {
//     try {
//       const { id_report_service } = req.params;
//       const {
//         id_bengkel,
//         id_suku_cadang,
//         jumlah_terpakai,
//         description,
//         bis_id,
//       } = req.body;

//       const bis = await bisRepository.getBisById(bis_id);
//       const sukuCadang = await sukuCadangRepository.getById(id_suku_cadang);
//       const bengkel = await bengkelRepository.getOneBengkel(id_bengkel);
//       const stockBengkel = await stockBengkelRepository.getStockBySukuCadangandBengkel(
//         { id_suku_cadang, id_bengkel }
//       );

//       if (bis === null || sukuCadang === null || bengkel === null) {
//         console.log("Bis : ", bis);
//         console.log("sukuCadang : ", sukuCadang);
//         console.log("stockBengkel : ", stockBengkel);
//         return {
//           status: HttpStatus.NOT_FOUND,
//           message: `${
//             bis === null
//               ? "bis"
//               : sukuCadang === null
//               ? "suku cadang"
//               : "bengkel"
//           } not found`,
//         };
//       } else if (jumlah_terpakai > stockBengkel.total_suku_cadang) {
//         return {
//           status: HttpStatus.BAD_REQUEST,
//           message:
//             "jumlah yang terpakai melebihi stock suku cadang pada bengkel ini",
//         };
//       }

//       await reportServiceRepository.createReport({
//         id_bengkel,
//         id_suku_cadang,
//         jumlah_yang_terpakai: jumlah_terpakai,
//         description,
//         id_bis: bis_id,
//       });
      

//       return {
//         status: HttpStatus.OK,
//         message: "success update new report",
//       };

//     } catch (err) {
//       console.log("error at updateReport at reportServiceController : ", err);
//       throw new ApiError(
//         "Internal Server Error",
//         HttpStatus.INTERNAL_SERVER_ERROR
//       );
//     }
//   },
};
