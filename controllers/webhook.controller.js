const ApiError = require("../helpers/ApiError");
const HttpStatus = require("http-status-codes");

const TransactionRepository = require("../repositories/transaction.repository");
const OrderRepository = require("../repositories/order.repository");

module.exports = {
  //   async getResponse(req) {},

  async postResponse(req) {
    try {
      let {
        transaction_status,
        order_id,
        transaction_id,
        payment_type,
      } = req.body;

      if (transaction_status === "deny") {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "payment deny",
        };
      }else if (transaction_status === "pending") {
          return {
              status: HttpStatus.OK,
              message: "transaction created"
          }
      }

      if (payment_type === "gopay" || payment_type === "akulaku") {
        payment_type = payment_type;
      } else if (payment_type === "cstore") {
        payment_type = req.body.store;
      }

      await TransactionRepository.updateTransactionById(
        { transaction_id },
        { transaction_status, payment_type }
      );

      await OrderRepository.updateOrderById({ order_id }, { paid: "terbayar" });

      return {
        status: HttpStatus.OK,
        message: "success payment",
      };
    } catch (err) {
      console.log("post Response : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
