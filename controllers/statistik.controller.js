const HttpStatus = require("http-status-codes");
const ApiError = require("../helpers/ApiError");

const scheduleRepository = require("../repositories/schedule.repository");

module.exports = {
  async getStatistikBulan(req) {
    try {
      const { bulan, tahun } = req.params;

      const schedule = await scheduleRepository.getStatistikMonth(
        `${tahun}-${bulan}`
      );

      return {
        status : HttpStatus.OK,
        message: "success",
        data   : {
            bulan  : bulan,
            tahun  : tahun,
            jumlah : schedule
        }
      };
    } catch (err) {
      console.log("Error getStatistikBulan : ", req);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
