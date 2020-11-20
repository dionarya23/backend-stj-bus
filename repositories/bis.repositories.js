const { Bis } = require("../services/table");
module.exports = {
  async createBis(bisData) {
    try {
      await Bis.create(bisData);
    } catch (e) {
      console.log("createBis error : ", e);
      throw "Something error";
    }
  },

  async updateBis(id, bisData) {
    try {
      const bisUpdated = await Bis.update(bisData, {
        where: { bis_id: id },
      });

      return bisUpdated;
    } catch (e) {
      console.log("update Bis : ", e);
      throw "Somthing error";
    }
  },

  
};
