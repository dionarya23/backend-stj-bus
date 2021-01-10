const UserModel = require("./models/users.model");
const BisModel = require("./models/bis.model");
const ScheduleBisModel = require("./models/schedule_bis.model");
const PassengerModel = require("./models/passenger.model");
const OrderModel = require("./models/order.model");
const TransactionModel = require("./models/transaction.model");
const PlaceModel = require("./models/place.mode");
const RouteLocationModel = require("./models/route_location.model");
const DriverBusModel = require("./models/driver_bus.model");
const SukuCadangModel = require("./models/suku_cadang.model");
const BengkelModel = require("./models/bengkel.model");
const StockBengkelModel = require("./models/stock_bengkel.model")

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

BengkelModel.hasMany(StockBengkelModel, {
  as : "pemilik_stock",
  constraints: false,
  foreignKey: "id_bengkel"
});

SukuCadangModel.hasMany(StockBengkelModel, {
  as: "suku_cadang",
  constraints : false,
  foreignKey: "id_suku_cadang"
});

BengkelModel.belongsTo(UserModel, {
  as: "mekanik",
  constraints: false,
  foreignKey: "user_id"
});

OrderModel.hasMany(PassengerModel, {
  as: "people_order",
  constraints: false,
  foreignKey: "order_id",
});

ScheduleBisModel.hasMany(RouteLocationModel, {
  as: "rute_perjalanan",
  constraints: false,
  foreignKey: "schedule_bis_id",
});

RouteLocationModel.belongsTo(PlaceModel, {
  as: "tempat",
  constraints: false,
  foreignKey: "place_id",
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
  Place: PlaceModel,
  RouteLocation: RouteLocationModel,
  DriverBus: DriverBusModel,
  SukuCadang: SukuCadangModel,
  Bengkel: BengkelModel,
  StockBengkel: StockBengkelModel,
};
