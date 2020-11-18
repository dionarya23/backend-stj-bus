const UserModel = require("./models/users.model");
const BisModel = require("./models/bis.model");
const ScheduleBisModel = require("./models/schedule_bis.model");
const PassengerModel = require("./models/passenger.model");
const OrderModel = require("./models/order.model");
const TransactionModel = require("./models/transaction.model")

BisModel.hasOne(ScheduleBisModel, {
  as: "bis_schedule"
});

ScheduleBisModel.belongsTo(BisModel, {
  as: "bis",
  constraints: false,
  foreignKey: "bis_id",
});

ScheduleBisModel.hasMany(PassengerModel, {
  as: "passengers",
  constraints: false,
  foreignKey: "schedule_bis_id",
});

OrderModel.hasOne(ScheduleBisModel, {
  as: "bis_schedule",
  constraints: false,
  foreignKey: "schedule_bis_id"
})


UserModel.hasMany(OrderModel, {
  as: "order_bis",
  constraints: false,
  foreignKey: "user_id",
  allowNull: true,
  defaultValue: true
});

OrderModel.belongsTo(UserModel, {
  as: "person_orders",
});

OrderModel.hasOne(TransactionModel, {
  as: "transaction_detail",
  constraints: false,
  foreignKey: "order_id"
})

module.exports = {
  Users: UserModel,
  Bis: BisModel,
  ScheduleBis: ScheduleBisModel,
  Passengers: PassengerModel,
  Orders : OrderModel,
  Transaction : TransactionModel
};
