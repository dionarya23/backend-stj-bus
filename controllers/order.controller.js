const ApiError = require("../helpers/ApiError");
const midtransCoreApi = require("../config/midtrans");

const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const orderIdGenerator = require("order-id")(process.env.ORDER_ID_SECRET);

const passengerRepository = require("../repositories/passenger.repository");
const orderRepository = require("../repositories/order.repository");
const transactionRepository = require("../repositories/transaction.repository");
const moment = require("moment");
module.exports = {
  async createOrder(req) {
    try {
      let {
        schedule_bis_id,
        passengers,
        total_price,
        email_order,
        phone_number_order,
        payment_type,
        id_destination,
        id_departure
      } = req.body;

      var user = null;
      if (req.header("Authorization")) {
        const decoded = jwt.verify(
          req.header("Authorization").replace("Bearer ", ""),
          process.env.JWTSECRET
        );

        user = decoded.user;
      }

      const orderData = {
        order_id: orderIdGenerator.generate(),
        schedule_bis_id,
        user_id: user != null ? user.user_id : null,
        total_price,
        email_order,
        phone_number_order,
        id_departure,
        id_destination,
      };

        await orderRepository.createOrder(orderData);
        passengers.map((e) => {
          e.order_id = orderData.order_id;
        });
        await passengerRepository.createPassengers(passengers);

      //payment
      let customerName = passengers[0].passenger_name.split(" ")

      let parameterPayment = {
        payment_type: "",
        transaction_details: {
          order_id: orderData.order_id,
          gross_amount: orderData.total_price,
        },
        customer_details: {
          first_name: customerName[0],
          last_name: customerName.length >= 2 ? customerName[1] : "",
          email: email_order,
          phone: phone_number_order,
        }
      };

      if (
        payment_type == "bca" ||
        payment_type == "bni" ||
        payment_type == "bri"
      ) {
        parameterPayment.payment_type = "bank_transfer";
        parameterPayment.bank_transfer = {
          bank: payment_type.toLowerCase(),
        };
      } else if (
        payment_type == "echannel" ||
        payment_type == "permata" ||
        payment_type == "akulaku"
      ) {
        parameterPayment.payment_type = payment_type;
      } else if (payment_type == "gopay") {
        parameterPayment.payment_type = payment_type;
      } else if (payment_type == "alfamart" || payment_type == "indomaret") {
        (parameterPayment.payment_type = "cstore"),
          (parameterPayment.cstore = {
            store: payment_type === "alfamart" ? "alfamart" : "indomaret",
            message: "Pembayaran Sudiro Tungga Jaya",
          });
      }

      console.log("Data parameter Payment ", parameterPayment);
      let responseMidtrans = await midtransCoreApi.charge(parameterPayment);

      await transactionRepository.createTransaction({
        transaction_id: responseMidtrans.transaction_id,
        order_id: orderData.order_id,
        transaction_status: responseMidtrans.transaction_status,
      });

      responseMidtrans.status = parseInt(responseMidtrans.status_code)
      responseMidtrans.message = responseMidtrans.status_message
      delete responseMidtrans.status_code
      delete responseMidtrans.status_message

      return responseMidtrans

    } catch (err) {
      console.log("error createOrder : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
