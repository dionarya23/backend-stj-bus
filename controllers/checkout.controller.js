const ApiError = require("../helpers/ApiError");
const midtransCoreApi = require("../config/midtrans");

const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const orderIdGenerator = require("order-id")(process.env.ORDER_ID_SECRET);

const passengerRepository = require("../repositories/passenger.repository");
const orderRepository = require("../repositories/order.repository");

module.exports = {
  async createCheckout(req) {
    try {
      let {
        schedule_bis_id,
        passengers,
        total_price,
        email_order,
        phone_number_order,
        payment_type,
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
      };

      //   await orderRepository.createOrder(orderData);
      //   passengers.map((e) => {
      //     e.order_id = orderData.order_id;
      //   });
      //   await passengerRepository.createPassengers(passengers);

      //payment
      var parameterPayment = {
        payment_type: "",
        transaction_details: {
          order_id: orderData.order_id,
          gross_amount: orderData.total_price,
        },
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
      //   const responseMidtrans = await midtransCoreApi.charge(parameterPayment);

      return {
        status: HttpStatus.CREATED,
        message: "success create order",
        // data: {
        //   orderId: orderData.order_id,
        // },
      };
    } catch (err) {
      console.log("error createOrder : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
