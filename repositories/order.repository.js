const { Orders } = require("../services/table")


module.exports = {
    async createOrder(orderData) {
        try {

        await Orders.create(orderData)

        }catch(err) {
            console.log("error orderData : ", err)
            throw "something error"
        }
    } 
}