const { PermintaanSukuCadang } = require("../services/table");

module.exports = {
  async insertPermintaan(newData) {
    try {
      await PermintaanSukuCadang.create(newData);
    } catch (err) {
      console.log("error at insertPermintaan : ", err);
      throw "Error at insertPermintaan PermintaanSukuCadang Repository";
    }
  },

  async updatePermintaan(id_permintaan_suku_cadang, updateData) {
    try {
      await PermintaanSukuCadang.update(updateData, {
        where: {
          id_permintaan_suku_cadang,
        },
      });
    } catch (err) {
      console.log("error at updatePermintaan : ", err);
      throw "Error at updatePermintaan PermintaanSukuCadang Repository";
    }
  },

  async getPermintaanById(id_permintaan_suku_cadang) {
    try {
      const permintaan = await PermintaanSukuCadang.findByPk(
        id_permintaan_suku_cadang
      );
      return permintaan;
    } catch (err) {
      console.log("Error at getPermintaanById PermintaanSukuCadang Repository");
      throw "Error at getPermintaanById PermintaanSukuCadang respository";
    }
  },
};
