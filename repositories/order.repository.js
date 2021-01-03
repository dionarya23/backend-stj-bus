const { Orders } = require("../services/table");

module.exports = {
  async createOrder(orderData) {
    try {
      await Orders.create(orderData);
    } catch (err) {
      console.log("error orderData : ", err);
      throw "error createOrder";
    }
  },

  async findOrderById(order_id) {
    try {
     const order = await Orders.findByPk(order_id)
     return order
    } catch (err) {
      console.log("error findOrderById : ", err);
      throw "error findOrderById";
    }
  },

  async updateOrderById(order_id, orderData) {
      try {
        await Orders.update(orderData, {
          where: order_id
        })
      }catch(err) {
        console.log("error updateOrderById : ", err)
        throw "error updateOrderById";
      } 
  }
};
