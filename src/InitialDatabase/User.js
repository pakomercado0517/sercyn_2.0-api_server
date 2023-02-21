const { User, Company } = require("../db");

const users = [
  {
    name: "Sergio",
    lastName: "Guerrero",
    email: "checko@email.com",
    password: "$2b$10$btvYu6YjkA2hNOxiSIyudu7YKxnxYVKESdDxEKOT44b7ktpSVUv3C",
    phone_number: 7567468765,
  },
  {
    name: "Batman",
    lastName: "Corp",
    email: "batman@gmail.com",
    password: "supermanSucks",
    phone_number: 2432414343,
  },
  {
    name: "Pedro",
    lastName: "Torres",
    email: "pedro.torres@email.com",
    password: "pedrito",
    phone_number: 12344321,
  },
];

const companies = [
  {
    name: "Náutica SerCyn",
    logo: "https://firebasestorage.googleapis.com/v0/b/sercyn-22d2f.appspot.com/o/web-images%2Flogo_sercyn_final.png?alt=media&token=5ca8fceb-814c-4e5d-8f2d-4636ea6babff",
    address: "Tuxpan Veracruz",
    UserId: 1,
  },
  {
    name: "Batman Corp",
    logo: "https://i.pinimg.com/originals/91/53/93/9153939d7544582c1fd8c692b626958d.png",
    address: "Gothic City",
    UserId: 2,
  },
  {
    name: "MTechnologies",
    logo: "https://png.pngtree.com/png-vector/20190326/ourlarge/pngtree-n-technology-logo-vector-png-image_868666.jpg",
    address: "Some place on USA",
    UserId: 3,
  },
];

const mapUsers = users.map((el) => {
  return {
    first_name: el.name,
    last_name: el.lastName,
    email: el.email,
    password: el.password,
    phone_number: el.phone_number,
  };
});

const mapCompanies = companies.map((el) => {
  return {
    name: el.name,
    logo: el.logo,
    address: el.address,
    UserId: el.UserId,
  };
});
const bulkUsers = async () => {
  await User.bulkCreate(mapUsers);
  console.log("Users created!");
};

const bulkCompanies = async () => {
  await Company.bulkCreate(mapCompanies);
  console.log("Companies created");
};

module.exports = { bulkUsers, bulkCompanies };
