const ApiError = require("../helpers/ApiError");
const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const passengerRepository = require("../repositories/passenger.repository");
const orderRepository = require("../repositories/order.repository");
const orderIdGenerator = require("order-id")(process.env.ORDER_ID_SECRET);

module.exports = {
  async createOrder(req) {
    try {
      let {
        schedule_bis_id,
        passengers,
        total_price,
        email_order,
        phone_number_order,
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

      await orderRepository.createOrder(orderData);

      passengers.map((e) => {
        e.order_id = orderData.order_id;
      });

      await passengerRepository.createPassengers(passengers);

      return {
        status: HttpStatus.CREATED,
        message: "success create order",
        data: {
          orderId: orderData.order_id,
        },
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
