const { Order } = require("../services/table")


module.exports = {
    async createOrder(order) {
        try {

            const order = await Order.create(order)
            return order
            
        }catch(err) {
            console.log("error orderData : ", err)
            throw "something error"
        }
    } 
}