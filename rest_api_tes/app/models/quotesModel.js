module.exports = (sequelize, Sequelize) => {
  const Quote = sequelize.define("quotes", {
    quote: {
      type: Sequelize.STRING,
      unique: true,
    },
    favorites: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Quote;
};
