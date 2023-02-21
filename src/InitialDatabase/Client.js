const { Client } = require("../db");

const clients = [
  {
    first_name: "ayle",
    last_name: "mercado",
    email: "ayle.2005@gmail.com",
    password: "abcdefg",
    phone_number: 123445654,
  },
];

const mapClients = clients.map((el) => {
  return {
    first_name: el.first_name,
    last_name: el.last_name,
    email: el.email,
    password: el.password,
    phone_number: el.phone_number,
  };
});

const bulkClients = async () => {
  await Client.bulkCreate(mapClients);
  console.log("Client created successfully");
};

module.exports = bulkClients;
