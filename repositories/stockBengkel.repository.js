const { StockBengkel } = require("../services/table");

module.exports = {
  async createNewStock(newStock) {
    try {
      await StockBengkel.create(newStock);
    } catch (err) {
      console.log("error at createNewStock stockBengkel repository : ", err);
      throw "error at createNewStock stockBengkel repository";
    }
  },

  async getStockBySukuCadangandBengkel({ id_suku_cadang, id_bengkel }) {
    try {
      const stockBengkel = await StockBengkel.findOne({
        where: {
          id_suku_cadang,
          id_bengkel,
        },
      });

      return stockBengkel;
    } catch (err) {
      console.log(
        "error at getStockBySukuCadangandBengkel stockBengkel repository : ",
        err
      );
      throw "error at getStockBySukuCadangandBengkel stockBengkel repository";
    }
  },
};
