const { Destination } = require("../db");

const createDestinations = [
  {
    name: "Isla de Lobos",
    image:
      "https://firebasestorage.googleapis.com/v0/b/sercyn-22d2f.appspot.com/o/web-images%2Fla-isla-de-los-lobos.jpg?alt=media&token=0890a33c-8c2b-40f0-8eac-f47ddfd5c441",
  },
  {
    name: "Arrecifes Coralinos",
    image:
      "https://elheraldodetuxpan.com.mx/images/Articulos/Estado/Tuxpan/2016/Abril/TX36.jpg",
  },
  {
    name: "Río Tuxpan",
    image: "https://pbs.twimg.com/media/C4GarjpVYAE3Yc3.jpg",
  },
  {
    name: "Manglares",
    image:
      "http://dondeviajar.org/wp-content/uploads/2020/01/manglares-de-tuxpan.jpg",
  },
];

const mapDestination = createDestinations.map((el) => {
  return {
    name: el.name,
    image: el.image,
  };
});

const bulkDestination = async () => {
  await Destination.bulkCreate(mapDestination);
  console.log("Local Destinations created!");
};

module.exports = bulkDestination;
