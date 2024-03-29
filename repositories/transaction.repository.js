const { Transaction } = require("../services/table");

module.exports = {
  async createTransaction(transactionData) {
    try {

        await Transaction.create(transactionData)
        
    } catch (err) {
      console.log("Error createTransaction : ", err);
      throw "error createTransaction";
    }
  },

  async updateTransactionById(transaction_id, data) {
    try {

      await Transaction.update(data, {
        where : transaction_id
      })

    }catch(err) {
      console.log("Error updateTransactionById : ", err)
      throw "error updateTransactionById"
    }
  }
};
