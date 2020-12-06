const firebase = require("firebase-admin");

const serviceAccount = require("./firebaseconfig.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  apiKey: "AIzaSyBXv_EJNoYd6xunLbVG2-k8byjUpknV1y4",
  databaseURL: "https://marketingone26.firebaseio.com",
});

module.exports = firebase;
