const HttpStatus = require("http-status-codes")
const ListPaymentType = require("../helpers/ListPaymentType")
const ApiError = require("../helpers/ApiError")
module.exports = {
    async getListPaymentType() {
        try {
            return {
                status : HttpStatus.OK,
                message: "succes get list payment type",
                data   : ListPaymentType
            }
        }catch(err) {
            throw new ApiError(
                "Internal Server Error",
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
               
    }
}