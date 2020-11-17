const midtransClient = require("midtrans-client");

const midtransCoreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.SERVERKEY_MIDTRANS,
  clientKey: process.env.CLIENTKEY_MIDTRANS,
});

module.exports = midtransCoreApi;
