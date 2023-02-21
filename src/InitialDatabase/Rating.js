const { Rating } = require("../db");

const ratings = [
  {
    qualification: 4,
    comment:
      "Excelente servicio, muy profesionales, dedicados y te ofrecen una super experiencia. Realmente me encanto la embarcación y el ambiente de la tripulación.",
    clientId: 1,
    boatId: 1,
  },
  {
    qualification: 5,
    comment:
      "Excelente servicio, muy profesionales, dedicados y te ofrecen una super experiencia. Realmente me encanto la embarcación y el ambiente de la tripulación. Lo recomiendo al 1000%",
    clientId: 1,
    boatId: 2,
  },
];

const mapRatings = ratings.map((el) => {
  return {
    qualification: el.qualification,
    comment: el.comment,
    ClientId: el.clientId,
    BoatId: el.boatId,
  };
});

const bulkRatings = async () => {
  await Rating.bulkCreate(mapRatings);
  console.log("Ratings created successfully");
};

module.exports = bulkRatings;
