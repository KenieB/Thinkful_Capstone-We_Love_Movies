const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").all(methodNotAllowed);

router.route("/:movieId").all(methodNotAllowed);

router.route("/:movieId/theaters").all(methodNotAllowed);

router.route("/:movieId/reviews").all(methodNotAllowed);

module.exports = router;