const { Bengkel, Users } = require("../services/table");

module.exports = {
  async getAllBengkel() {
    try {
      const bengkel = await Bengkel.findAll({
        include: [
          {
            model: Users,
            as: "mekanik",
            attributes: [
              "user_id",
              "firstname",
              "lastname",
              "email",
              "phone_number",
              "user_type",
            ],
          },
        ],
      });

      return bengkel;
    } catch (err) {
      console.log("error getAllBengkel Bengkel Repositories : ", err);
      throw "error at updateData repositories";
    }
  },

  async getOneBengkel(id_bengkel) {
    try {
      const bengkel = await Bengkel.findByPk(id_bengkel, {
        include: [
          {
            model: Users,
            as: "mekanik",
            attributes: [
              "user_id",
              "firstname",
              "lastname",
              "email",
              "phone_number",
              "user_type",
            ],
          },
        ],
      });

      return bengkel;
    } catch (err) {
      console.log("error getOneBengkel bengkel repository : ", err);
      throw "error at getOneBengkel bengkel repository";
    }
  },

  async insertDataBengkel(dataBengkel) {
    try {
      await Bengkel.create(dataBengkel);
    } catch (err) {
      console.log("error insertDataBengkel at bengkel repository : ", err);
      throw "error at insertDataBengkel bengkel repository";
    }
  },

  async getBengkelByUserId(user_id) {
    try {
      const bengkel = await Bengkel.findOne({
        where: {
          user_id: user_id,
        },
      });

      return bengkel;
    } catch (err) {
      console.log("error getBengkelByUserId at bengkel repository : ", err);
      throw "error at getBengkelByUserId bengkel repository";
    }
  },

  async updateBengkelData(id_bengkel, bengkelData) {
    try {
      await Bengkel.update(bengkelData, {
        where: {
          id_bengkel: id_bengkel,
        },
      });
    } catch (err) {
      console.log("error updateBengkelData at bengkel repository : ", err);
      throw "error updateBengkelData at bengkel repository";
    }
  },

  async deleteBengkelData(id_bengkel) {
      try {
          await Bengkel.destroy({
              where: {
                  id_bengkel: id_bengkel
              }
          })
      }catch(err) {
          console.log("error updateBengkelData at bengkel repository : ", err);
          throw "error deleteBengkelData at bengkel repository";
      }
  }
};
