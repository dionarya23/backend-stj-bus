const midtransCoreApi = require("../config/midtrans");
const HttpStatus = require("http-status-codes");
const ApiError = require("../helpers/ApiError");

module.exports = {
  async createCheckout(req) {
    try {

      // let parameter = {
      //   payment_type: "gopay",
      //   transaction_details: {
      //     gross_amount: 10000,
      //     order_id: "transaksi_id",
      //   },
      //   gopay: {
      //     enable_callback: true, // optional
      //     callback_url: "gojek://callback", // optional
      //   },
      // };

      // charge transaction
      // const responseMidtrans = await midtransCoreApi.charge(parameter);
      return {
        status: HttpStatus.OK,
        data: responseMidtrans,
      };
    } catch (error) {
      console.log("test prosess : ", error);
      throw new ApiError(
        "Internal Server Error.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
