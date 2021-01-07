const { SukuCadang } = require("../services/table");

module.exports = {
  async getAll() {
    try {
      const sukuCadang = await SukuCadang.findAll();
      return sukuCadang;
    } catch (err) {
      console.log("error at getAll SukuCadang Repositories : ", err);
      throw "error at getAll SukuCadang Repositories";
    }
  },

  async insertData(dataSukuCadang) {
    try {
      await SukuCadang.create(dataSukuCadang);
    } catch (err) {
      console.log("error insertData SukuCadang Repositories : ", err);
      throw "error at insertData repositories";
    }
  },

  async updateData(id_suku_cadang, dataSukuCadang) {
    try {
      await SukuCadang.update(dataSukuCadang, {
        where: {
          id_suku_cadang: id_suku_cadang,
        },
      });
    } catch (err) {
      console.log("error updateData SukuCadang Repositories : ", err);
      throw "error at updateData repositories";
    }
  },

  async deleteData(id_suku_cadang) {
    try {
      await SukuCadang.destroy({
        where: {
          id_suku_cadang: id_suku_cadang,
        },
      });
    } catch (err) {
      console.log("error deleteData SukuCadang Repositories : ", err);
      throw "error at deleteData repositories";
    }
  },

  async getById(id_suku_cadang) {
      try {

        const suku_cadang = await SukuCadang.findByPk(id_suku_cadang);
        return suku_cadang
      }catch(err) {
          console.log("error getById sukuCadang repositories : ",err);
          throw "error at getById repositories";
      }
  }
};
