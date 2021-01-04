const HttpStatus = require("http-status-codes");
const ApiError = require("../helpers/ApiError");
const PassengerRepository = require("../repositories/passenger.repository");
module.exports = {
  async check(req) {
    try {
      const { schedule_bis_id, date_departure } = req.body;

      const passenger = await PassengerRepository.getListSeat({
        schedule_bis_id,
        date_departure,
      });

      // 1A 1B    6A 6B
      // 2A 2B    7A 7B
      // 3A 3B    8A 8B
      // 4A 4B    9A 9B
      // 5A 5B    10A 10B
      let kursi = [];

      for (let i = 0; i < 10; i++) {
        for (let z = 0; z < 2; z++) {
            const no_kursi = z === 0 ? `${i + 1}A` : `${i + 1}B`;
              kursi.push({
                no: no_kursi,
                kosong: true,
              });
        }
      }

      passenger.map(seat => {
          for(y=0;y<kursi.length;y++) {
              if (seat.seat_passenger === kursi[y].no) {
                  kursi[y].kosong = false
              }
          }
      })

      return {
        status: HttpStatus.OK,
        message: "success get seats",
        data: kursi,
      };
    } catch (err) {
      console.log("check passengers.controller : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },

  async checkPassenger(req) {
    try {
      const { order_id } = req.params
      const detailBisdanPenumpang = await PassengerRepository.checkPassengerWithOrderId(order_id);
      let newStrukturResponse = detailBisdanPenumpang.bisDetail.length > 0 ? 
        detailBisdanPenumpang.bisDetail[0]
       : {}

       newStrukturResponse.penumpang = detailBisdanPenumpang.passengerDetail
      return {
        status  : HttpStatus.OK,
        message : "success",
        data    : newStrukturResponse 
      }

    }catch(err) {
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
};
