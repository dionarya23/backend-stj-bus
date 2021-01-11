const { ReportService } = require("../services/table");

module.exports = {
  async createReport(newReport) {
    try {
      await ReportService.create(newReport);
    } catch (err) {
      console.log("error at newReport ReportService Repository : ", err);
      throw "error at newReport ReportService Repository";
    }
  },
};
