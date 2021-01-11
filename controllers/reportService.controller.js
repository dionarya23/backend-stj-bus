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
        jumlah_yang_terpakai,
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
      } else if (
        jumlah_yang_terpakai > stockBengkel.total_suku_cadang ||
        stockBengkel.total_suku_cadang === 0
      ) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message:
            stockBengkel.total_suku_cadang === 0
              ? "stock suku cadang pada bengkel ini habis"
              : "jumlah yang terpakai melebihi stock suku cadang pada bengkel ini",
        };
      }
      await stockBengkelRepository.updateStockBengkel({
        id_stock_bengkel: stockBengkel.id_stock_bengkel,
        total_suku_cadang:
          stockBengkel.total_suku_cadang - jumlah_yang_terpakai,
      });
      await reportServiceRepository.createReport({
        id_bengkel,
        id_suku_cadang,
        jumlah_yang_terpakai,
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

  async updateReport(req) {
    try {
      const { id_report_service } = req.params;
      const {
        id_bengkel,
        id_suku_cadang,
        jumlah_yang_terpakai,
        bis_id,
      } = req.body;

      const bis = await bisRepository.getBisById(bis_id);
      const sukuCadang = await sukuCadangRepository.getById(id_suku_cadang);
      const bengkel = await bengkelRepository.getOneBengkel(id_bengkel);
      const stockBengkel = await stockBengkelRepository.getStockBySukuCadangandBengkel(
        { id_suku_cadang, id_bengkel }
      );
      const reportService = await reportServiceRepository.getOneReport(
        id_report_service
      );

      if (
        bis === null ||
        sukuCadang === null ||
        bengkel === null ||
        reportService === null
      ) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: `${
            bis === null
              ? "bis"
              : sukuCadang === null
              ? "suku cadang"
              : bengkel === null
              ? "bengkel"
              : "report service"
          } not found`,
        };
      } else if (
        jumlah_yang_terpakai >
          stockBengkel.total_suku_cadang + reportService.jumlah_yang_terpakai ||
        stockBengkel.total_suku_cadang + reportService.jumlah_yang_terpakai ===
          0
      ) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message:
            stockBengkel.total_suku_cadang === 0
              ? "stock suku cadang pada bengkel ini habis"
              : "jumlah yang terpakai melebihi stock suku cadang pada bengkel ini",
        };
      }

      await stockBengkelRepository.updateStockBengkel({
        id_stock_bengkel: stockBengkel.id_stock_bengkel,
        total_suku_cadang:
          stockBengkel.total_suku_cadang +
          reportService.jumlah_yang_terpakai -
          jumlah_yang_terpakai,
      });
      await reportServiceRepository.updateReport(id_report_service, req.body);

      return {
        status: HttpStatus.OK,
        message: "success update new report",
      };
    } catch (err) {
      console.log("error at updateReport at reportServiceController : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async deleteReport(req) {
    try {
      const { id_report_service } = req.params;
      const reportService = await reportServiceRepository.getOneReport(
        id_report_service
      );

      if (!reportService) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "report service not found",
        };
      }

      await reportServiceRepository.removeReport(id_report_service);
      return {
        status: HttpStatus.OK,
        message: "success delete report service",
      };
    } catch (err) {
      console.log("error at deleteReport at reportServiceController : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async getReportServiceByBengkelId(req) {
    try {
      const { id_bengkel } = req.params;

      const bengkel = await bengkelRepository.getOneBengkel(id_bengkel);
      if (!bengkel) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "bengkel not found",
        };
      }

      const reportServiceByBengkel = await reportServiceRepository.getReportServiceByBengkel(
        id_bengkel
      );

      return {
        status: HttpStatus.OK,
        message: "success get report bengkel by bengkel",
        data: reportServiceByBengkel,
      };
    } catch (err) {
      console.log(
        "error at getReportServiceByBengkelId at reportServiceController : ",
        err
      );
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async getAllReport() {
    try {
      const reportService = await reportServiceRepository.getReportService();
      return {
        status: HttpStatus.OK,
        message: "success get report service",
        data: reportService,
      };
    } catch (err) {
      console.log("error at getAllReport at reportServiceController : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async getOneReport(req) {
    try {
      const { id_report_service } = req.params;
      const reportService = await reportServiceRepository.getOneReport(
        id_report_service
      );

      if (!reportService) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "report service not found",
        };
      }

      return {
        status: HttpStatus.OK,
        message: "success get report service",
        data: reportService,
      };
    } catch (err) {
      console.log("error at getOneReport at reportServiceController : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
