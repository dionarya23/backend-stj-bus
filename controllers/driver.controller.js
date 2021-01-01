const HttpStatus = require("http-status-codes");
const ApiError = require("../helpers/ApiError");
const uuid = require("uuid");
const path = require("path");

const DriverBusRepository = require("../repositories/driver_bus.repository")

module.exports = {
  async uploadPhoto(req) {
    try {
      const { photo } = req.files;
      const { driver_bus_id } = req.body

      let types = ["image/jpg", "image/jpeg", "image/png"];

      if (!types.includes(photo.mimetype)) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: "unacceptable type file, must be jpg, png, jpeg",
        };
      } else if (photo.size > 4563415) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: "size file max 4MB",
        };
      }

      let ext = photo.name.split(".")[1];
      let imageName = `${uuid.v4()}.${ext}`;
      await photo.mv(path.join(__dirname, `../assets/images/driver/${imageName}`));
      await DriverBusRepository.uploadPhotoDriver({photo_driver: imageName, driver_bus_id});

      return {
        status: HttpStatus.OK,
        message: "success upload photo",
      };
    } catch (err) {
      console.log("Error upload photo : ", err);
      throw new ApiError(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
};
