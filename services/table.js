const UserModel = require("./models/users.model");
const BisModel = require("./models/bis.model");
const ScheduleBisModel = require("./models/schedule_bis.model");
const PassengerModel = require("./models/passenger.model");
const OrderModel = require("./models/order.model");
const TransactionModel = require("./models/transaction.model");

ScheduleBisModel.belongsTo(BisModel, {
  as: "bis",
  constraints: false,
  foreignKey: "bis_id",
});

ScheduleBisModel.hasMany(OrderModel, {
  as: "schedule_order",
  constraints: false,
  foreignKey: "schedule_bis_id",
});

OrderModel.hasMany(PassengerModel, {
  as: "people_order",
  constraints: false,
  foreignKey: "order_id",
});

UserModel.hasMany(OrderModel, {
  as: "order_bis",
  constraints: false,
  foreignKey: "user_id",
  allowNull: true,
  defaultValue: true,
});

OrderModel.hasOne(TransactionModel, {
  as: "transaction_detail",
  constraints: false,
  foreignKey: "order_id",
});

module.exports = {
  Users: UserModel,
  Bis: BisModel,
  ScheduleBis: ScheduleBisModel,
  Passengers: PassengerModel,
  Orders: OrderModel,
  Transaction: TransactionModel,
};
