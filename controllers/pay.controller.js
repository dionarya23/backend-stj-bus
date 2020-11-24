const midtransCoreApi = require("../config/midtrans");
const HttpStatus = require("http-status-codes");
const ApiError = require("../helpers/ApiError");
const orderRepositories = require("../repositories/order.repository");
module.exports = {
  async bankTransfer(req) {
    try {
      let { order_id, bank } = req.body;
      const order = await orderRepositories.findOrderById(order_id);
      if (!order) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "order id not found",
        };
      }

      var parameter = {
        payment_type: "bank_transfer",
        transaction_details: {
            order_id: order.order_id,
            gross_amount: order.total_price
        },
        custom_expiry : {
            order_time: "2016-12-07 11:54:12 +0700",
            expiry_duration: 1,
            unit: "minute"
        }
      };

      if (bank == "bca" || bank == "bni" || bank == "bri") {
          parameter.bank_transfer = {
            bank: bank.toLowerCase()
        }
      }else if (bank == "echannel" || bank == "permata") {
          parameter.payment_type = bank
      }

      console.log("parameter : ", parameter)

      //   charge transaction
    //   const responseMidtrans = await midtransCoreApi.charge(parameter);

      return {
        status: HttpStatus.OK,
        message: "success create payment",
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
