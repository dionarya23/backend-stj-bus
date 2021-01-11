const {
  ReportService,
  Bis,
  SukuCadang,
  Bengkel,
} = require("../services/table");
const { QueryTypes } = require("sequelize");

const sequelize = require("../config/database");
module.exports = {
  async createReport(newReport) {
    try {
      await ReportService.create(newReport);
    } catch (err) {
      console.log("error at newReport ReportService Repository : ", err);
      throw "error at newReport ReportService Repository";
    }
  },

  async updateReport(id_report_service, updatedReportData) {
    try {
      await ReportService.update(updatedReportData, {
        where: {
          id_report_service,
        },
      });
    } catch (err) {
      console.log("error at updateReport Repository : ", err);
      throw "error at updateReport report service repository";
    }
  },

  async getOneReport(id_report_service) {
    try {
      const reportService = await ReportService.findByPk(id_report_service);
      return reportService;
    } catch (err) {
      console.log("error at getOneReport Repository : ", err);
      throw "error at getOneReport report service repository";
    }
  },

  async removeReport(id_report_service) {
    try {
      await ReportService.destroy({
        where: {
          id_report_service,
        },
      });
    } catch (err) {
      console.log("error at updateReport report serviceRepository : ", err);
      throw "error at updateReport report service repository";
    }
  },

  async getReportServiceByBengkel(id_bengkel) {
    try {
      let rawQuery = `
      SELECT
      report_service.id_report_service,
      report_service.description,
      report_service.jumlah_yang_terpakai,
      suku_cadang.nama_suku_cadang,
      suku_cadang.id_suku_cadang,
      bis.plat_nomor as plat_nomor_bis,
      bis.type_bis,
      bis.bis_id,
      bengkel.id_bengkel,
      bengkel.alamat_bengkel,
      bengkel.nama_bengkel
      FROM report_service
      inner join suku_cadang on suku_cadang.id_suku_cadang = report_service.id_suku_cadang
      inner join bengkel on bengkel.id_bengkel = report_service.id_bengkel
      inner join bis on bis.bis_id = report_service.id_bis
      where report_service.id_bengkel=${id_bengkel}
      `;
      const reportService = await sequelize.query(rawQuery, {
        type: QueryTypes.SELECT,
      });

      return reportService;
    } catch (err) {
      console.log(
        "error at getReportServiceByBengkel report service Repository : ",
        err
      );
      throw "error at getReportServiceByBengkel report service repository";
    }
  },

  async getReportService() {
    try {
      let rawQuery = `
      SELECT
      report_service.id_report_service,
      report_service.description,
      report_service.jumlah_yang_terpakai,
      suku_cadang.nama_suku_cadang,
      suku_cadang.id_suku_cadang,
      bis.plat_nomor as plat_nomor_bis,
      bis.type_bis,
      bis.bis_id,
      bengkel.id_bengkel,
      bengkel.alamat_bengkel,
      bengkel.nama_bengkel
      FROM report_service
      inner join suku_cadang on suku_cadang.id_suku_cadang = report_service.id_suku_cadang
      inner join bengkel on bengkel.id_bengkel = report_service.id_bengkel
      inner join bis on bis.bis_id = report_service.id_bis
      `;
      const reportService = await sequelize.query(rawQuery, {
        type: QueryTypes.SELECT,
      });

      return reportService;
    } catch (err) {
      console.log(
        "error at getReportService report service Repository : ",
        err
      );
      throw "error at getReportService report service repository";
    }
  },
};
