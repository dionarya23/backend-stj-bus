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

  async getStockSukuCadangById(id_stock_bengkel) {
    try {
      const stockBengkel = await StockBengkel.findByPk(id_stock_bengkel);
      return stockBengkel;
    } catch (err) {
      console.log(
        "error at getStockSukuCadangById stockBengkel repository : ",
        err
      );
      throw "error at getStockSukuCadangById stockBengkel repository";
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

  async updateStockBengkel({ id_stock_bengkel, stock_suku_cadang }) {
    try {
      await StockBengkel.update(
        { stock_suku_cadang },
        {
          where: { id_stock_bengkel },
        }
      );
    } catch (err) {
      console.log(
        "error at getStockBySukuCadangandBengkel stockBengkel repository : ",
        err
      );
      throw "error at getStockBySukuCadangandBengkel stockBengkel repository";
    }
  },
};
