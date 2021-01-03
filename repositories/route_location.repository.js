const { RouteLocation } = require("../services/table");

module.exports = {
  async createRouteLocation(route_details) {
    try {
        await RouteLocation.bulkCreate(route_details)
    } catch (err) {
      console.log("error createRouteLocation repository : ", err);
      throw "error createRouteLocation";
    }
  },
};
