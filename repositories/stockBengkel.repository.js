const { StockBengkel } = require("../services/table");

const { QueryTypes } = require("sequelize");

const sequelize = require("../config/database");

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

  async updateStockBengkel({ id_stock_bengkel, total_suku_cadang }) {
    try {
      await StockBengkel.update(
        { total_suku_cadang },
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

  async getSukuCadangByBengkel(id_bengkel) {
    try {
      
      let rawQuery = `
      SELECT
        bengkel.id_bengkel,
        stock_bengkel.total_suku_cadang as stock_suku_cadang_bengkel,
        stock_bengkel.id_stock_bengkel,
        suku_cadang.nama_suku_cadang,
        suku_cadang.id_suku_cadang
      FROM stock_bengkel
      inner join bengkel on bengkel.id_bengkel=stock_bengkel.id_bengkel
      inner join suku_cadang on suku_cadang.id_suku_cadang=stock_bengkel.id_suku_cadang
      where bengkel.id_bengkel=${id_bengkel}
      `;

      const bengkel = await sequelize.query(rawQuery, {
        type: QueryTypes.SELECT,
      });

      return bengkel;
    } catch (err) {
      console.log(
        "error at getSukuCadangByBengkel stockBengkel repository : ",
        err
      );
      throw "error at getSukuCadangByBengkel stockBengkel repository";
    }
  },
};
