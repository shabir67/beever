const { response } = require("express");
const fetch = require("node-fetch");
const db = require("../models");
const Quotes = db.quotes;
const Op = db.Sequelize.Op;

exports.quotes = async (req, res, next) => {
  try {
    async function getKanye() {
      const yeWords = await fetch(" https://api.kanye.rest/");
      const response = await yeWords.json();
      const quotes = await response.quote;
      return quotes;
    }
    const data1 = await Quotes.create({
      quote: await getKanye(),
      favorites: false,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while saves ye wisdom.",
        });
      });
  } catch (e) {
    return next(res.json({ error: e }));
  }
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.quote) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Quotes
  const quotes = {
    quote: req.body.quote,
    favorites: req.body.favorites ? req.body.favorites : false,
  };

  // Save Quotes in the database
  Quotes.create(quotes)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Quotes.update(
    { favorites: req.body.favorites },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Quotes was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Quotes with id=${id}. Maybe Quotes was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Quotes with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Quotes.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Quotes was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Quotes with id=${id}. Maybe Quotes was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Quotes with id=" + id,
      });
    });
};

exports.report = async (req, res) => {
  try {
    console.log("getting approved data in on sessions");
    const data1 = await Quotes.findAll({
      where: {
        favorites: true,
      },
    });
    const data2 = await Quotes.findAll({
      where: {
        favorites: false,
      },
    });
    return res.status(200).send({ quotes: data2, favorites: data1 });
  } catch (e) {
    return next(res.json({ error: e }));
  }
};
