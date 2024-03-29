const { Bis } = require("../services/table");
module.exports = {
  async createBis(bisData) {
    try {
      await Bis.create(bisData);
    } catch (e) {
      console.log("createBis error : ", e);
      throw "error createBis";
    }
  },

  async updateBis(bis_id, bisData) {
    try {
      const bisUpdated = await Bis.update(bisData, {
        where: { bis_id },
      });

      return bisUpdated;
    } catch (e) {
      console.log("update Bis : ", e);
      throw "error updateBis";
    }
  },

  async getBisById(bis_id) {
    try {
      const bisUpdated = await Bis.findByPk(bis_id);

      return bisUpdated;
    } catch (e) {
      console.log("getBisById : ", e);
      throw "error getBisById";
    }
  },

  async deleteBis(bis_id) {
    try {
      await Bis.destroy({
        where: { bis_id },
      });
    } catch (e) {
      console.log("deleteBis : ", e);
      throw "error deleteBis";
    }
  },

  async getAllBis() {
    try {
      const bis_ = await Bis.findAll();
      return bis_;
    } catch (e) {
      console.log("getAllBis : ", e);
      throw "error getAllBis";
    }
  },
};
