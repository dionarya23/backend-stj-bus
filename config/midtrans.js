const midtransClient = require("midtrans-client");

const midtransCoreApi = new midtransClient.CoreApi({
  isProduction: process.env.ISPRODUCTION_MIDTRANS,
  serverKey: process.env.SERVERKEY_MIDTRANS,
  clientKey: process.env.CLIENTKEY_MIDTRANS,
});

module.exports = midtransCoreApi