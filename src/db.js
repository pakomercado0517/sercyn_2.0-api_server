require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_LOCAL_URL } = process.env;

const sequelize = new Sequelize(`${DB_LOCAL_URL}`, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);
const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
// @ts-ignore
sequelize.models = Object.fromEntries(capsEntries);

// Aqui integramos las relaciones de los modelos...
// ej. User.hasmany(Product)
const {
  User,
  Company,
  Destination,
  Boat,
  Price,
  Client,
  Transaction,
  Rating,
  PaymentsCollection,
} = sequelize.models;

User.hasOne(Company);
Company.belongsTo(User);

Company.hasMany(Boat);
Boat.belongsTo(Company);

Boat.hasMany(Price);
Price.belongsTo(Boat);

Destination.hasMany(Price);
Price.belongsTo(Destination);

Transaction.hasOne(PaymentsCollection);
PaymentsCollection.belongsTo(Transaction);

// Transaction.hasMany(Boat);
// Boat.belongsTo(Transaction);

// Transaction.hasMany(Destination);
// Destination.belongsTo(Transaction);

// Transaction.hasMany(Client);
// Client.belongsTo(Transaction);

Boat.hasMany(Transaction);
Transaction.belongsTo(Boat);

Client.hasMany(Transaction);
Transaction.belongsTo(Client);

Destination.hasMany(Transaction);
Transaction.belongsTo(Destination);

// Client.belongsToMany(Boat, { through: "transactions" });
// Boat.belongsToMany(Client, { through: "transactions" });

Client.hasMany(Rating);
Rating.belongsTo(Client);

Boat.hasMany(Rating);
Rating.belongsTo(Boat);

module.exports = {
  ...sequelize.models, //Importamos los modelos de la siguiente manera: const {User, Product}= require('db.js')
  conn: sequelize, // Importamos la conexi??n. Ej: {conn} = require('./db.js')
};
