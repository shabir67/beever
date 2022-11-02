const { authJwt } = require("../middleware");
const controller = require("../controllers/quotesController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/kanye", [authJwt.verifyToken], controller.quotes);
  app.post("/api/test/create", [authJwt.verifyToken], controller.create);
  app.put("/api/test/update/:id", [authJwt.verifyToken], controller.update);
  app.delete("/api/test/delete/:id", [authJwt.verifyToken], controller.delete);
  app.get("/api/test/divide", [authJwt.verifyToken], controller.report);
};
