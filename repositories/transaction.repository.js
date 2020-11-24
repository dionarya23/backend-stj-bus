const { Transaction } = require("../services/table");

module.exports = {
  async createTransaction(transactionData) {
    try {

        await Transaction.create(transactionData)
        
    } catch (err) {
      console.log("Error createTransaction : ", err);
      throw "Something error";
    }
  },
};
