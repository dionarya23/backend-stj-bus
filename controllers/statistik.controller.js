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
            bulan  : parseInt(bulan),
            tahun  : parseInt(tahun),
            jumlah : schedule.count
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


  async getStatistikTahun(req) {
    try {

      const { tahun } = req.params
      let statistik = [];
      let total_perjalanan_per_tahun = 0;
      for (let i = 1; i<=12;i++) {
        let bulan = i >= 10 ? i : `0${i}`;
        let total_perjalanan = await scheduleRepository.getStatistikMonth(
          `${tahun}-${bulan}`
        );

        total_perjalanan_per_tahun += total_perjalanan.count
        statistik.push({
            bulan  : parseInt(bulan),
            tahun  : parseInt(tahun),
            jumlah : total_perjalanan.count
        })
      }

      return {
        status  : HttpStatus.OK,
        message : "success",
        data    : {
          total_perjalanan_tahun : total_perjalanan_per_tahun,
          statistik
        } 
      }

    }catch(err) {
      console.log("Error getStatistikTahun : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
};
